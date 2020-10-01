import { ReactElement } from "react";
import { Awaitable } from "../../common/typings";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { DataTableRowWithKey } from "../widget/DataTable";
import { WidgetController, WidgetElement } from "../widget/Widget";
import { AnyDataInput } from "./DataInput";
import { InputError } from "./Input";
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
  // protected getError(): Awaitable<InputError<C> | undefined> {
  //   if (!this.connectionProps.nullable) {
  //     if (this.value == null) {
  //       return "REQUIRED";
  //     }
  //   }
  // }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}

// TOOD: InputView
