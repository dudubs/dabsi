import { MetaType } from "../../common/MetaType";
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
  InputError,
  InputValue,
  InputValueElement,
} from "./Input";
import { InputErrorHook } from "./InputErrorHook";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

export type ArraySchemaError =
  | "TOO_MANY_ITEMS"
  | "TOO_FEW_ITEMS"
  | "UNIQUE_ITEM";

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

  Data: InputData<Item>[];

  Value: InputValue<Item>[];

  ValueElement: InputValueElement<Item>[];

  Props: {
    item: Item;
    newItem: NewItem;

    isUniqueItem: boolean;
    getKeyFromItemData?: (data: InputData<Item>) => string;
    getKeyFromNewItemData?: (data: InputData<Item>) => string;
  };

  Config:
    | (RpcUndefinedConfig<Item & NewItem> & UndefinedGetItemValue)
    | PartialUndefinedKeys<
        {
          readonly newItemConfig: RpcConfig<NewItem>;

          readonly itemConfig: RpcConfig<Item>;

          getItemValue: /*FromNewItemValue*/
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
    default?: InputValueElement<Item>[];
    item: WidgetElement<Item>;
    newItem: WidgetElement<NewItem>;
    maxLength?: number;
    minLength?: number;
  };

  Controller: RpcMap<{
    item: Item;

    newItem: NewItem;

    // addNewItem
    addNewItem: Command<
      (
        data: InputData<Item>
      ) => ErrorOrValue<InputError<NewItem>, InputValueElement<Item>>
    >;
  }>;

  Error:
    | ArraySchemaError
    | {
        children: Record<string, InputError<Item>>;
      };
}>;

export const NOT_UNIQUE = "NOT_UNIQUE";

export type AnyArrayInput = ArrayInput<AnyInput, AnyInput>;

type ArrayItem<
  IsUniqueItem extends boolean,
  Item extends AnyInput
> = IsUniqueItem extends false ? Item : InputErrorHook<Item, typeof NOT_UNIQUE>;

export function ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput = Item,
  IsUniqueItem extends boolean = false
>(
  item: Item,
  options?: PartialUndefinedKeys<
    {
      getKeyFromItemData:
        | ((data: InputData<Item>) => string)
        | If<Not<IsUniqueItem>, undefined>;

      getKeyFromNewItemData:
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
  const getKeyFromItemData =
    options && "getKeyFromItemData" in options
      ? options.getKeyFromItemData
      : undefined;
  const newItem = options?.newItem ?? item;
  return <any>Input<AnyArrayInput>({
    props: {
      item,
      newItem,
      isUniqueItem: options?.isUniqueItem ?? false,
      getKeyFromItemData,
      getKeyFromNewItemData:
        (options && "getKeyFromNewItemData" in options
          ? options.getKeyFromNewItemData
          : undefined) ?? getKeyFromItemData,
    },
    context: ArrayInputContext,
    controller: RpcMap<MetaType<WidgetController<AnyArrayInput>>["MapItems"]>({
      item,
      newItem,
      addNewItem: Command<(data: any) => any>(),
    }),

    getValueElementFromElement(element) {
      return element.default || [];
    },

    getDataFromValueElement(items) {
      const { getKeyFromItemData } = this;
      return items.map((itemValue, index) => {
        return this.item.props.getDataFromValueElement(itemValue);
      });
    },
  });
}
