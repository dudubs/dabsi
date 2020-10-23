import {
  Awaitable,
  If,
  Is,
  Not,
  PartialUndefinedKeys,
} from "../../../common/typings";
import {
  AbstractRpcHandler,
  RpcUndefinedConfig,
  RpcUnresolvedConfig,
} from "../../Rpc";
import { RpcMap } from "../../RpcMap";
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
import { InputErrorHook } from "../InputErrorHook";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { ArrayInputContext } from "./ArrayInputContext";
import { ArrayInputHandler } from "./ArrayInputHandler";

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
    isUniqueItem: boolean;
    getKeyFromItemData?: (data: InputValueData<Item>) => string;
    getKeyFromNewItemData?: (data: InputValueData<Item>) => string;
  };

  Config:
    | (RpcUndefinedConfig<Item & NewItem> & UndefinedGetItemValue)
    | PartialUndefinedKeys<
        {
          readonly newItemConfig: RpcUnresolvedConfig<NewItem>;

          readonly itemConfig: RpcUnresolvedConfig<Item>;

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
  }>;

  Error:
    | ArraySchemaError
    | {
        children: Record<string, InputError<Item>>;
      };
}>;

export const UniqueItemError = "NOT_UNIQUE";

export type AnyArrayInput = ArrayInput<AnyInput, AnyInput>;

type InputUniqueItemErrorHook<
  IsUniqueItem extends boolean,
  Item extends AnyInput
> = IsUniqueItem extends false
  ? Item
  : InputErrorHook<Item, typeof UniqueItemError>;

export function ArrayInput<
  Item extends AnyInput,
  NewItem extends AnyInput = Item,
  IsUniqueItem extends boolean = false
>(
  item: Item,
  options?: PartialUndefinedKeys<
    {
      getKeyFromItemData:
        | ((data: InputValueData<Item>) => string)
        | If<Not<IsUniqueItem>, undefined>;

      getKeyFromNewItemData:
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
): ArrayInput<
  InputUniqueItemErrorHook<IsUniqueItem, Item>,
  InputUniqueItemErrorHook<IsUniqueItem, NewItem>
> {
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
    handler: ArrayInputHandler,
    controller: RpcMap({
      item,
      newItem,
    }),

    getValueData(items) {
      const { getKeyFromItemData } = this;
      return items.map((itemValue, index) => {
        return this.item.getValueData(itemValue);
      });
    },
  });
}
