import { Awaitable } from "../../../common/typings2/Async";
import { If, Not } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { RpcUndefinedConfig, RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../rpc-map/RpcMap";
import { WidgetElement } from "../../widget/Widget";
import {
  AnyInput,
  ErrorOrValue,
  Input,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { InputErrorMap } from "../input-map/InputMap";
import { InputErrorHook } from "../InputErrorHook";
import { LengthError } from "../LengthError";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { ArrayInputHandler } from "./ArrayInputHandler";

export type TArrayInput = { NewItem: AnyInput; Item: AnyInput };

export type ArrayInput<
  T extends TArrayInput,
  Item extends AnyInput = T["Item"],
  NewItem extends AnyInput = T["NewItem"],
  UndefinedGetItemValue extends undefined = If<
    Is<InputValue<NewItem>, InputValue<Item>>,
    undefined
  >
> = Input<{
  TArrayInput: T;

  ItemDataValue: InputValueData<Item>;
  Commands: {
    addNewItem: {
      (data: InputValueData<Item>): ErrorOrValue<
        InputError<NewItem>,
        InputValueElement<Item>
      >;
      handler: "handleAddNewItem";
    };
  };

  ValueData: InputValueData<Item>[];

  Value: InputValue<Item>[];

  ValueElement: InputValueElement<Item>[];

  Props: {
    item: Item;
    newItem: NewItem;
    // TODO: uniqueItem?: {...}
    uniqueItem?: {
      getItemDataKey: (data: InputValueData<Item>) => string;
      getNewItemDataKey: (data: InputValueData<Item>) => string;
    };
  };

  Config:
    | (RpcUndefinedConfig<Item & NewItem> & UndefinedGetItemValue)
    | PartialUndefinedKeys<
        {
          readonly newItemConfig: RpcUnresolvedConfig<NewItem>;

          readonly itemConfig: RpcUnresolvedConfig<Item>;

          addNewItem:
            | ((value: InputValue<NewItem>) => Awaitable<InputValue<Item>>)
            | UndefinedGetItemValue;
        },
        {
          // TODO: DO NOT USE ConfigFactory -> ValueOrAwaitableFn
          default?: ValueOrAwaitableFn<InputValue<Item>[]>;

          maxLength?: number;
          minLength?: number;
        }
      >;

  Element: {
    item: WidgetElement<Item>;
    newItem: WidgetElement<NewItem>;
    maxLength?: number;
    minLength?: number;
  };

  Controller: RpcMap<{
    item: Item;

    newItem: NewItem;
  }>;

  Error: LengthError | "UNIQUE_ITEM" | InputErrorMap<Record<string, Item>>;
}>;

export type AnyArrayInput = ArrayInput<TArrayInput>;

type _InputUniqueItemErrorHook<
  IsUniqueItem extends boolean,
  Item extends AnyInput
> = IsUniqueItem extends false
  ? Item
  : InputErrorHook<{ Target: Item; Error: "NOT_UNIQUE" }>;

export function ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput = Item,
  IsUniqueItem extends boolean = false
>(
  item: Item,
  options?: PartialUndefinedKeys<
    {
      getItemDataKey:
        | ((data: InputValueData<Item>) => string)
        | If<Not<IsUniqueItem>, undefined>;

      getNewItemDataKey:
        | ((data: InputValueData<NewItem>) => string)
        | If<
            | Not<IsUniqueItem>
            | Is<InputValueData<NewItem>, InputValueData<Item>>,
            undefined
          >;
    },
    {
      isUniqueItem?: IsUniqueItem;
      newItem?: NewItem;
    }
  >
): ArrayInput<{
  Item: _InputUniqueItemErrorHook<IsUniqueItem, Item>;
  NewItem: _InputUniqueItemErrorHook<IsUniqueItem, NewItem>;
}> {
  const getItemDataKey =
    options && "getItemDataKey" in options ? options.getItemDataKey : undefined;

  const getNewItemDataKey =
    (options && "getNewItemDataKey" in options
      ? options.getNewItemDataKey
      : undefined) ?? getItemDataKey;

  const newItem = options?.newItem ?? item;
  return <any>Input<AnyArrayInput>({
    props: {
      item,
      newItem,
      uniqueItem: getItemDataKey &&
        getNewItemDataKey && {
          getNewItemDataKey,
          getItemDataKey,
        },
    },
    handler: ArrayInputHandler,
    controller: RpcMap({
      item,
      newItem,
    }),

    getValueDataFromElement(items) {
      return items.map(itemValue => {
        return this.item.getValueDataFromElement(itemValue);
      });
    },
  });
}
