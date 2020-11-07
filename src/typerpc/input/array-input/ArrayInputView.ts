import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { RandomId } from "../../../common/patterns/RandomId";
import { RequiredOnly } from "../../../common/typings";
import { RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { InputType } from "../Input";
import { InputView, InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyArrayInput, TArrayInput } from "./ArrayInput";

export type AnyArrayInputConnection = RpcConnection<AnyArrayInput>;

export type ArrayInputViewProps<
  C extends AnyArrayInputConnection,
  T extends TArrayInput = InputType<C>["TArrayInput"]
> = InputViewProps<C> & {
  renderItem(props: {
    props: InputViewProps<RpcConnection<T["Item"]>>;
    view: ArrayInputView<C>;
    key: string;
    index: number;
  }): ReactElement;

  renderNewItem(
    props: InputViewProps<RpcConnection<T["NewItem"]>>,
    view: ArrayInputView<C>
  ): ReactElement;

  children(view: RequiredOnly<ArrayInputView<C>>): ReactNode;
};

export class ArrayInputView<
  C extends AnyArrayInputConnection,
  T extends TArrayInput = InputType<C>["TArrayInput"]
> extends AbstractInputView<C, ArrayInputViewProps<C>> {
  children = new InputViewChildren();

  remove(index: number) {
    this.setValue(this.value?.filter((_, i) => i !== index) || []);
  }

  newItemInput: InputView<RpcConnection<T["NewItem"]>>;

  async add(): Promise<boolean> {
    await this.newItemInput.validate();
    if (this.newItemInput.error != null) return false;

    const itemKey =
      this.rpc.uniqueItem?.getNewItemDataKey(this.newItemInput.data) ??
      RandomId();

    if (this.children.viewMap[itemKey]) {
      this.newItemInput.setError("UNIQUE_ITEM");
      return false;
    }

    const result = await this.connection.command(
      "addNewItem",
      this.newItemInput.data
    );
    if ("error" in result) {
      this.newItemInput.setError(result.error);
      return false;
    }

    await this.setValue([...(this.value || []), result.value]);
    return true;
  }

  renderNewItem() {
    return this.props.renderNewItem(
      {
        value: undefined,
        onChange: async newItemInput => {
          const {
            connection: {
              rpc: { uniqueItem },
            },
          } = this;

          if (uniqueItem) {
            const key = uniqueItem.getNewItemDataKey(newItemInput.data);
            if (key && this.children.viewMap[key]) {
              newItemInput.setError("UNIQUE_ITEM");
            }
          }
        },
        key: "add",
        connection: this.controller.newItem,
        element: this.element.newItem,
        inputRef: input => {
          this.newItemInput = input!;
        },
      },
      this
    );
  }

  renderItems() {
    const { uniqueItem } = this.rpc;

    return this.value?.map((value, index) => {
      let key: string;
      if (uniqueItem) {
        key = uniqueItem.getItemDataKey(
          this.rpc.item.getValueDataFromElement(value)
        );
      } else {
        key = String(index);
      }
      return createElement(
        Fragment,
        { key },
        this.props.renderItem({
          props: {
            connection: this.controller.item,
            element: this.element.item,
            value,
            onChange: view => {
              if (uniqueItem) {
                const key = uniqueItem.getItemDataKey(view.data);
                if (this.children.viewMap[key]) {
                  view.setError("UNIQUE_ITEM");
                  return;
                }
              }
              return this.setValue(
                mapIndexToValue(this.value || [], index, view.value)
              );
            },
            inputRef: this.children.ref(key),
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