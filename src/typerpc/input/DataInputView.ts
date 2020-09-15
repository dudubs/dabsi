import {ReactElement} from "react";
import {Awaitable} from "../../common/typings";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {DataTableRow} from "../widget/DataTable";
import {WidgetType} from "../widget/Widget";
import {WidgetViewProps} from "../widget/WidgetView";
import {AnyDataInput, DataInput} from "./DataInput";
import {InputType} from "./Input";
import {InputView} from "./InputView";

export type AnyDataInputConnection = RpcConnection<AnyDataInput>;

export type DataInputViewProps<C extends AnyDataInputConnection> = WidgetViewProps<C> & {};

export class DataInputView<C extends AnyDataInputConnection>
    extends InputView<C, DataInputViewProps<C> & {
        children(view: DataInputView<C>): ReactElement
    }> {

    @ViewState()  selected?:  DataTableRow<WidgetType<C>['Controller']>;



    get selectedLabel(): string {
        return this.selected?.label || "";
    }

    protected updateElement(element: WidgetType<C>["Element"] | undefined) {
        this.selected = element?.default;
    }

    select(row:DataTableRow<WidgetType<C>['Controller']>) {
        this.selected = row;
    }

    getValidData(): Awaitable<InputType<C>["Data"]> {
        return this.selected?.$key;
    }

    renderView(): React.ReactNode {
        return this.props.children(this)
    }

}
