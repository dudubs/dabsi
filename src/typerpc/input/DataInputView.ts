import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { DataTableRow } from "../widget/DataTable";
import { WidgetController, WidgetElement } from "../widget/Widget";
import { AnyDataInput } from "./DataInput";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type AnyDataInputConnection = RpcConnection<AnyDataInput>;

export type DataInputViewProps<
  C extends AnyDataInputConnection
> = InputViewProps<C> & {};

export class DataInputView<C extends AnyDataInputConnection> extends InputView<
  C,
  DataInputViewProps<C> & {
    children(view: DataInputView<C>): ReactElement;
  }
> {
  @ViewState() selected?: DataTableRow<WidgetController<C>>;

  protected updateElement(element: WidgetElement<C>) {
    this.selected = element.default;
  }
  freezeElement(): WidgetElement<C> {
    return { ...this.element, default: this.selected };
  }

  select(row: DataTableRow<WidgetController<C>>) {
    this.selected = row;
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }

  getValidData(): Awaitable<InputErrorOrData<C>> {
    return { value: this.selected?.$key };
  }
}
