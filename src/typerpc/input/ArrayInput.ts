import { mapArrayToObject } from "../../common/array/mapArrayToObject";
import { MetaType } from "../../common/MetaType";
import { RandomId } from "../../common/patterns/RandomId";
import {
  Awaitable,
  If,
  Is,
  Not,
  PartialUndefinedKeys,
} from "../../common/typings";
import { Command } from "../Command";
import { RpcConfig, RpcUndefinedConfig } from "../Rpc";
import { RpcMap } from "../RpcMap";
import { WidgetController, WidgetElement } from "../widget/Widget";
import { ArrayInputContext } from "./ArrayInputContext";
import {
  AnyInput,
  ErrorOrValue,
  Input,
  InputData,
  InputValueElement,
  InputError,
  InputValue,
} from "./Input";
import { InputErrorHook } from "./InputErrorHook";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

export type ArraySchemaError = "TOO_MANY_ITEMS" | "TOO_FEW_ITEMS";

export type ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput,
  UndefinedGetItemValue extends undefined = If<
    Is<InputValue<NewItem>, InputValue<Item>>,
    undefined
  >
> = Input<{
  Item: Item;
  NewItem: NewItem;

  Data: Record<string, InputData<Item>>;

  Value: InputValue<Item>[];

  ValueElement: {
    value: InputValueElement<Item>;
    element: WidgetElement<Item>;
  }[];

  Props: {
    isUniqueItem: boolean;
    getKeyFromItem?: (data: InputData<Item>) => string;
    getKeyFromNewItem?: (data: InputData<Item>) => string;
  };

  Config:
    | (RpcUndefinedConfig<Item & NewItem> & UndefinedGetItemValue)
    | PartialUndefinedKeys<
        {
          readonly newItemConfig: RpcConfig<NewItem>;

          readonly itemConfig: RpcConfig<Item>;

          getItemValue:
            | UndefinedGetItemValue
            | ((value: InputValue<NewItem>) => Awaitable<InputValue<Item>>);

          // getItemKey: (value:InputValue<Item>)=>
        },
        {
          // TODO: DO NOT USE ConfigFactory -> ValueOrAwaitableFn
          default?: ValueOrAwaitableFn<InputValue<Item>[]>;

          maxLength?: number;
          minLength?: number;
        }
      >;

  Element: {
    items: WidgetElement<Item>[];
    newItem: WidgetElement<NewItem>;
    maxLength?: number;
    minLength?: number;
  };

  Controller: RpcMap<{
    item: Item;

    newItem: NewItem;

    getItemElement: Command<
      (
        data: InputData<Item>
      ) => ErrorOrValue<InputError<NewItem>, WidgetElement<Item>>
    >;
  }>;

  Error: ArraySchemaError | Record<string, InputError<Item>>;
}>;

export type AnyArrayInput = ArrayInput<AnyInput, AnyInput>;

type ArrayItem<
  IsUniqueItem extends boolean,
  Item extends AnyInput
> = IsUniqueItem extends false ? Item : InputErrorHook<Item, "NOT_UNIQUE">;

export function ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput = Item,
  IsUniqueItem extends boolean = false
>(
  item: Item,
  options?: PartialUndefinedKeys<
    {
      getKeyFromItem:
        | ((data: InputData<Item>) => string)
        | If<Not<IsUniqueItem>, undefined>;

      getKeyFromNewItem:
        | ((data: InputData<NewItem>) => string)
        | If<
            Not<IsUniqueItem> | Is<InputData<NewItem>, InputData<Item>>,
            undefined
          >;
    },
    {
      isUniqueItem?: IsUniqueItem;
      newItem?: NewItem;
    }
  >
): ArrayInput<ArrayItem<IsUniqueItem, Item>, ArrayItem<IsUniqueItem, NewItem>> {
  const getKeyFromItem =
    options && "getKeyFromItem" in options ? options.getKeyFromItem : undefined;
  return <any>Input<AnyArrayInput>({
    props: {
      isUniqueItem: options?.isUniqueItem ?? false,
      getKeyFromItem,
      getKeyFromNewItem:
        (options && "getKeyFromNewItem" in options
          ? options.getKeyFromNewItem
          : undefined) ?? getKeyFromItem,
    },
    context: ArrayInputContext,
    controller: RpcMap<MetaType<WidgetController<AnyArrayInput>>["MapItems"]>({
      item: item,
      newItem: options?.newItem ?? item,
      getItemElement: Command<(data: any) => any>(),
    }),
    getValueElementFromElement(element) {
      return element.items.map((element) => ({
        value: this.controller.props.items.item.props.getValueElementFromElement(
          element
        ),
        element,
      }));
    },
    getElementFromValueElement(element, value) {
      return { ...element, items: value.map((item) => item.element) };
    },
    getDataFromElement(element) {
      const id = RandomId();
      return mapArrayToObject(element.items || [], (element, index) => {
        const itemProps = this.controller.props.items.item.props;
        const itemData = itemProps.getDataFromElement(element);
        const itemKey =
          this.getKeyFromItem?.(itemData) ?? id + index.toString();

        return [itemKey, itemData];
      });
    },
  });
}
