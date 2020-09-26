import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { defined } from "../../common/object/defined";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { RandomId } from "../../common/patterns/RandomId";
import { Awaitable, RequiredOnly } from "../../common/typings";
import { WeakId } from "../../common/WeakId";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { AnyArrayInput } from "./ArrayInput";
import {
  AnyInput,
  AnyInputConnection,
  InputError,
  InputType,
  InputValueElement,
} from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

export type AnyArrayInputConnection = RpcConnection<AnyArrayInput>;

type ItemConnection<T extends AnyArrayInputConnection> = RpcConnection<
  InputType<T>["Item"]
>;

type NewItemConnection<T extends AnyArrayInputConnection> = RpcConnection<
  InputType<T>["NewItem"]
>;

export type ArrayInputViewProps<
  C extends AnyArrayInputConnection
> = InputViewProps<C> & {
  renderItem(props: {
    props: InputViewProps<ItemConnection<C>>;
    view: ArrayInputView<C>;
    key: string;
    index: number;
  }): ReactElement;

  renderNewItem(
    props: InputViewProps<NewItemConnection<C>>,
    view: ArrayInputView<C>
  ): ReactElement;

  children(view: RequiredOnly<ArrayInputView<C>>): ReactNode;
};
export class ArrayInputView<
  C extends AnyArrayInputConnection
> extends InputView<C, ArrayInputViewProps<C>> {
  // protected updateElement(element: WidgetType<C>["Element"]) {
  //   super.updateElement(element);
  //   const id = RandomId();
  //   const { getKeyFromItem } = this.props.connection.props;
  //   const itemProps = this.props.connection.props.controller.props.items.item
  //     .props;
  //   this.itemsProps = (element?.items || []).map((element, index) => {
  //     const key = getKeyFromItem?.(
  //       itemProps.getDataFromValueElement(
  //         itemProps.getValueElementFromElement(element)
  //       )
  //     );
  //     return this.getItemProps(key ?? id + index, element);
  //   });
  // }

  protected async getError(): Promise<InputError<C> | undefined> {
    const keyToError = {};
    for (const [key, input, index] of entries(this.itemKeyToInput)) {
      await input.checkError((error) => {
        keyToError[index] = error;
      });
    }
    if (hasKeys(keyToError)) return { children: keyToError };
  }

  @ViewState() protected items: {
    props: InputViewProps<ItemConnection<C>>;
    key: string;
  }[];

  protected itemKeyToInput: Record<string, InputView<ItemConnection<C>>> = {};

  async onItemChange(itemKey: string) {
    const item = defined(
      this.itemKeyToInput[itemKey],
      () => `No item for key "${itemKey}"`
    );

    const itemData = await item.getCheckedData();
    if (item.hasError) {
      return;
    }

    const { getKeyFromItem } = this.props.connection.props;
    if (getKeyFromItem) {
      const newKey = getKeyFromItem(itemData);
      if (itemKey !== newKey) {
        if (this.itemKeyToInput[newKey]) {
          item.setError("NOT_UNIQUE");
          return;
        }
      }
    }
    this.props.onChange?.(this);
  }

  protected getItemProps(
    itemKey: string,
    element: WidgetElement<InputType<C>["Item"]>
  ): InputViewProps<ItemConnection<C>> & { itemKey: string } {
    return {
      key: itemKey,
      itemKey,
      element,
      connection: this.controller.item,
      onChange: () => this.onItemChange(itemKey),
      inputRef: (view) => {
        if (!view) {
          if (this.itemKeyToInput[itemKey] === view) {
            delete this.itemKeyToInput[itemKey];
          }
        } else {
          this.itemKeyToInput[itemKey] = view;
        }
      },
    };
  }

  remove(index: number) {
    this.setValue(this.value.filter((_, i) => i !== index));
  }

  newItemInput: InputView<RpcConnection<InputType<C>["NewItem"]>>;

  async add(): Promise<boolean> {
    const [isValidData, itemData] = await this.newItemInput.getCheckedData();
    if (!isValidData) return false;

    const itemKey =
      this.connectionProps.getKeyFromNewItem?.(itemData) ?? RandomId();

    if (this.itemKeyToInput[itemKey]) {
      this.newItemInput.setError("NOT_UNIQUE");
      return false;
    }

    const result = await this.controller.addNewItem(itemData);
    if ("error" in result) {
      this.newItemInput.setError(result.error);
      return false;
    }

    this.setValue([...this.value, result.value]);
    return true;
  }

  renderNewItem() {
    return this.props.renderNewItem(
      {
        onChange: async (newItemInput) => {
          const {
            connectionProps: { getKeyFromNewItem },
          } = this;

          if (getKeyFromNewItem) {
            const [isValidData, data] = await newItemInput.getCheckedData();
            if (!isValidData) return;

            const key = getKeyFromNewItem(data);
            if (key && this.itemKeyToInput[key]) {
              newItemInput.setError("NOT_UNIQUE");
            }
          }
        },
        key: "add",
        connection: this.controller.newItem,
        element: this.element.newItem,
        inputRef: (input) => {
          this.newItemInput = input!;
        },
      },
      this
    );
  }
  protected updateValue(value: InputValueElement<C>) {
    this.items = value.map((element) => {
      const key =
        this.connectionProps.getKeyFromItem?.(
          this.connectionProps.item.props.getDataFromValueElement(element)
        ) ?? "i" + WeakId(element);
      return {
        key,
        props: {
          key,
          element,
          connection: this.controller.item,
          onChange: () => this.onItemChange(key),
          inputRef: (view) => {
            if (!view) {
              if (this.itemKeyToInput[key] === view) {
                delete this.itemKeyToInput[key];
              }
            } else {
              this.itemKeyToInput[key] = view;
            }
          },
        },
      };
    });
  }

  renderItems() {
    const {
      getKeyFromItem,
      item: { props: itemProps },
    } = this.connectionProps;
    return this.value.map((value, index) => {
      let key: string;
      if (getKeyFromItem) {
        key = getKeyFromItem(itemProps.getDataFromValueElement(value));
      } else {
        if (value && typeof value === "object") {
          key = "i" + WeakId(value);
        } else {
          key = "i" + index.toString();
        }
      }

      return createElement(
        Fragment,
        { key },
        this.props.renderItem({
          props: {
            connection: this.controller.item,
            element: this.element.item,
            value,
            onChange: (view) => {
              this.setValue(mapIndexToValue(this.value, index, view.value));
            },
          },
          view: this,
          index,
          key,
        })
      );
    });
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}

export function mapIndexToValue<T>(arr: T[], index: number, newValue: T): T[] {
  return arr.map((v, i) => (i === index ? newValue : v));
}
