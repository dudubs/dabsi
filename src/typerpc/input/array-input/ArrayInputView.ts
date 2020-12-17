import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { RandomId } from "@dabsi/common/patterns/RandomId";
import { RequiredOnly } from "@dabsi/common/typings2/RequiredOnly";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AbstractInputView } from "@dabsi/typerpc/input/AbstractInputView";
import { InputType } from "@dabsi/typerpc/input/Input";
import { InputView, InputViewProps } from "@dabsi/typerpc/input/InputView";
import { InputViewChildren } from "@dabsi/typerpc/input/InputViewChildren";
import { AnyArrayInput, TArrayInput } from "@dabsi/typerpc/input/array-input/ArrayInput";

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
      this.connection.$widget.uniqueItem?.getNewItemDataKey(
        this.newItemInput.data
      ) ?? RandomId();

    if (this.children.viewMap[itemKey]) {
      this.newItemInput.setError("UNIQUE_ITEM");
      return false;
    }

    const result = await this.connection.addNewItem(this.newItemInput.data);
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
        elementState: undefined,
        onElementStateChange: undefined,
        onChange: async newItemInput => {
          const {
            connection: {
              $widget: { uniqueItem },
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
        connection: this.connection.newItem,
        element: this.element.newItem,
        inputRef: input => {
          this.newItemInput = input!;
        },
      },
      this
    );
  }

  renderItems() {
    const { uniqueItem } = this.connection.$widget;

    return this.value?.map((value, index) => {
      let key: string;
      if (uniqueItem) {
        key = uniqueItem.getItemDataKey(
          this.connection.item.$widget.getValueDataFromElement(value)
        );
      } else {
        key = String(index);
      }
      return createElement(
        Fragment,
        { key },
        this.props.renderItem({
          props: {
            connection: this.connection.item,
            element: this.element.item,
            elementState: undefined,
            onElementStateChange: undefined,
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
