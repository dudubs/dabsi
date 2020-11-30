import { Awaitable } from "../../../common/typings2/Async";
import { If, Not } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { RpcUndefinedConfig, RpcUnresolvedConfig } from "../../Rpc";
import { RpcFnMap } from "../../rpc-fn/RpcFn";
import { RpcMap } from "../../rpc-map/RpcMap";
import { ToAsync, WidgetElement } from "../../widget/Widget";
import {
  AnyInput,
  ErrorOrValue,
  Input,
  InputError,
  InputType,
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

type _Types<T extends TArrayInput> = {
  AddNewItemFn(
    data: InputValueData<T["Item"]>
  ): ErrorOrValue<InputError<T["NewItem"]>, InputValueElement<T["Item"]>>;
};

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

  Controller: {
    newItem: NewItem;
    item: Item;
    addNewItem(
      data: InputValueData<T["Item"]>
    ): ErrorOrValue<InputError<T["NewItem"]>, InputValueElement<T["Item"]>>;
  };

  Children: {
    newItem: NewItem;
    item: Item;
  };

  ItemDataValue: InputValueData<Item>;

  Commands: {
    addNewItem: _Types<T>["AddNewItemFn"];
  };

  Connection: {
    addNewItem: ToAsync<_Types<T>["AddNewItemFn"]>;
  };

  ValueData: InputValueData<Item>[];

  Value: InputValue<Item>[];

  ValueConfig: InputValue<Item>[] | undefined;

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

  Error: LengthError | "UNIQUE_ITEM" | InputErrorMap<Record<string, Item>>;
}>;

export type AnyArrayInput = ArrayInput<TArrayInput>;

type _InputUniqueItemErrorHook<
  IsUniqueItem extends boolean,
  Item extends AnyInput
> = IsUniqueItem extends false
  ? Item
  : InputErrorHook<{ Target: Item; Error: "NOT_UNIQUE" }>;

export type ArrayInputOptions<
  Item extends AnyInput,
  NewItem extends AnyInput,
  IsUniqueItem extends boolean
> = PartialUndefinedKeys<
  {
    getItemDataKey:
      | ((data: InputValueData<Item>) => string)
      | If<Not<IsUniqueItem>, undefined>;

    getNewItemDataKey:
      | ((data: InputValueData<NewItem>) => string)
      | If<
          Not<IsUniqueItem> | Is<InputValueData<NewItem>, InputValueData<Item>>,
          undefined
        >;
  },
  {
    isUniqueItem?: IsUniqueItem;
    newItem?: NewItem;
  }
>;

export function ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput = Item,
  IsUniqueItem extends boolean = false
>(
  item: Item,
  options?: ArrayInputOptions<Item, NewItem, IsUniqueItem>
): ArrayInput<{
  Item: _InputUniqueItemErrorHook<IsUniqueItem, Item>;
  NewItem: _InputUniqueItemErrorHook<IsUniqueItem, NewItem>;
}> {
  const {
    getItemDataKey,
    getNewItemDataKey = getItemDataKey,
    newItem = item,
  } = (options || {}) as ArrayInputOptions<AnyInput, AnyInput, boolean>;

  return <any>Input<AnyArrayInput>({
    children: {
      ...RpcFnMap("addNewItem"),
      item,
      newItem,
    },
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
    getValueDataFromElement(items) {
      return items.map(itemValue => {
        return this.item.getValueDataFromElement(itemValue);
      });
    },
  });
}
