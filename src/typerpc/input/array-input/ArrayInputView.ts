import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { defined } from "../../../common/object/defined";
import { entries } from "../../../common/object/entries";
import { hasKeys } from "../../../common/object/hasKeys";
import { values } from "../../../common/object/values";
import { RandomId } from "../../../common/patterns/RandomId";
import { RequiredOnly } from "../../../common/typings";
import { WeakId } from "../../../common/WeakId";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { WidgetElement } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import { AnyArrayInput, UniqueItemError } from "./ArrayInput";
import { InputError, InputType, InputValueElement } from "../Input";
import { InputView, InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";

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
> extends AbstractInputView<C, ArrayInputViewProps<C>> {
  children = new InputViewChildren();

  remove(index: number) {
    this.setValue(this.value.filter((_, i) => i !== index));
  }

  newItemInput: InputView<RpcConnection<InputType<C>["NewItem"]>>;

  async add(): Promise<boolean> {
    await this.newItemInput.validate();
    if (this.newItemInput.error != null) return false;

    const itemKey =
      this.connectionProps.getKeyFromNewItemData?.(this.newItemInput.data) ??
      RandomId();

    if (this.children.keyToView[itemKey]) {
      this.newItemInput.setError(UniqueItemError);
      return false;
    }

    const result = await this.controller.addNewItem(this.newItemInput.data);
    if ("error" in result) {
      this.newItemInput.setError(result.error);
      return false;
    }

    await this.setValue([...this.value, result.value]);
    return true;
  }

  renderNewItem() {
    return this.props.renderNewItem(
      {
        onChange: async newItemInput => {
          const {
            connectionProps: { getKeyFromNewItemData },
          } = this;

          if (getKeyFromNewItemData) {
            const key = getKeyFromNewItemData(newItemInput.data);
            if (key && this.children.keyToView[key]) {
              newItemInput.setError(UniqueItemError);
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
    const {
      getKeyFromItemData,
      item: { props: itemProps },
    } = this.connectionProps;
    return this.value.map((value, index) => {
      let key: string;
      if (getKeyFromItemData) {
        key = getKeyFromItemData(itemProps.getValueData(value));
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
              if (getKeyFromItemData) {
                const key = getKeyFromItemData(view.data);
                if (this.children.keyToView[key]) {
                  view.setError(UniqueItemError);
                  return;
                }
              }
              return this.setValue(
                mapIndexToValue(this.value, index, view.value)
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
