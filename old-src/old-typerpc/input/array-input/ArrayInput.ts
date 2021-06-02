import { Awaitable } from "@dabsi/common/typings2/Async";
import { If, Not } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { ArrayInputHandler } from "@dabsi/old-typerpc/input/array-input/ArrayInputHandler";
import {
  AnyInput,
  ErrorOrValue,
  Input,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { InputErrorMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { InputErrorHook } from "@dabsi/old-typerpc/input/InputErrorHook";
import { LengthError } from "@dabsi/old-typerpc/input/LengthError";
import {
  RpcUndefinedConfig,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import { WidgetElement } from "@dabsi/old-typerpc/widget/Widget";

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

  Controller: {
    newItem: NewItem;
    item: Item;
    addNewItem(
      data: InputValueData<T["Item"]>
    ): ErrorOrValue<InputError<T["NewItem"]>, InputValueElement<T["Item"]>>;
  };

  ItemDataValue: InputValueData<Item>;

  ValueData: InputValueData<Item>[];

  Value: InputValue<Item>[];

  ValueConfig: InputValue<Item>[] | undefined;

  ValueElement: InputValueElement<Item>[];

  Props: {
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

// TODO: TArrayOptions = {item, newItem, isUniqueItem}
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
    type: ArrayInput,
    isConfigCanBeUndefined: false,
    children: {
      item,
      newItem,
    },
    commands: { addNewItem: true },
    props: {
      uniqueItem: getItemDataKey &&
        getNewItemDataKey && {
          getNewItemDataKey,
          getItemDataKey,
        },
    },
    handler: ArrayInputHandler,
    getValueDataFromValueElement(items) {
      return items.map(itemValue => {
        return this.children.item.getValueDataFromValueElement(itemValue);
      });
    },
  });
}
