import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { defined } from "../../common/object/defined";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { RandomId } from "../../common/patterns/RandomId";
import { RequiredOnly } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { WidgetElement, WidgetType } from "../widget/Widget";
import { AnyArrayInput } from "./ArrayInput";
import { InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

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
    props: InputViewProps<ItemConnection<C>> & { itemKey: string };
    view: ArrayInputView<C>;
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
  protected updateElement(element: WidgetType<C>["Element"]) {
    super.updateElement(element);
    const id = RandomId();
    const { getKeyFromItem } = this.props.connection.props;
    const itemProps = this.props.connection.props.controller.props.items.item
      .props;
    this.itemsProps = (element?.items || []).map((element, index) => {
      const key = getKeyFromItem?.(itemProps.getDataFromElement(element));
      return this.getItemProps(key ?? id + index, element);
    });
  }

  async getValidData(): Promise<InputErrorOrData<C>> {
    const error = {};
    const value = {};

    for (const { itemKey: key } of this.itemsProps) {
      const input = this.itemKeyToInput[key];
      if (!input) continue;
      const result = await input.getValidData();
      value[key] = result.value;
      if ("error" in result) {
        error[key] = result.error;
      }
    }

    if (hasKeys(error)) return { error, value };
    return { value };
  }

  @ViewState() protected itemsProps: (InputViewProps<ItemConnection<C>> & {
    itemKey: string;
  })[];

  protected itemKeyToInput: Record<string, InputView<ItemConnection<C>>> = {};

  async onItemChange(itemKey: string) {
    const item = defined(
      this.itemKeyToInput[itemKey],
      () => `No item for key "${itemKey}"`
    );

    const dataResult = await item.getValidData();
    if ("error" in dataResult) return;

    const { getKeyFromItem } = this.props.connection.props;
    if (getKeyFromItem) {
      const newKey = getKeyFromItem(dataResult.value);
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
    this.itemsProps = this.itemsProps.filter((_, i) => i !== index);
  }

  swap(index1: number, index2: number) {
    this.itemsProps = this.itemsProps.map((item, index) => {
      const nextIndex =
        index === index1 ? index2 : index === index2 ? index1 : index;

      if (index !== nextIndex) {
        return this.itemsProps[nextIndex];
      }

      return item;
    });
  }

  newItemInput?: InputView<RpcConnection<InputType<C>["NewItem"]>>;

  async getUniqueNewItemData(): Promise<
    InputErrorOrData<InputType<C>["NewItem"]>
  > {
    const result = await this.newItemInput!.getValidData();
    if ("error" in result) return result;
    const { getKeyFromNewItem } = this.props.connection.props;
    if (getKeyFromNewItem) {
      const key = getKeyFromNewItem(result.value);
      if (this.itemKeyToInput[key]) {
        this.newItemInput?.setError("NOT_UNIQUE");
        return { ...result, error: "NOT_UNIQUE" };
      }
    }
    return result;
  }

  async add(): Promise<boolean> {
    const dataResult = await this.getUniqueNewItemData();
    if ("error" in dataResult) return false;

    const result = await this.controller.getItemElement(dataResult.value);
    if ("error" in result) {
      this.newItemInput?.setError(result.error);
      return false;
    }
    this.itemsProps = [
      ...this.itemsProps,
      this.getItemProps(RandomId(), result.value),
    ];
    return true;
  }

  freezeElement(): WidgetElement<C> {
    return {
      ...this.element,
      items: this.itemsProps.map((itemProps) =>
        this.itemKeyToInput[itemProps.itemKey].freezeElement()
      ),
    };
  }

  renderNewItem() {
    return this.props.renderNewItem(
      {
        onChange: () => {
          this.getUniqueNewItemData();
        },
        key: "add",
        connection: this.controller.newItem,
        element: this.element.newItem,
        inputRef: (input) => {
          this.newItemInput = input;
        },
      },
      this
    );
  }

  renderItems() {
    return this.itemsProps.map((item, index) => {
      return createElement(
        Fragment,
        { key: item.key },
        this.props.renderItem({
          props: item,
          view: this,
          index,
        })
      );
    });
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
