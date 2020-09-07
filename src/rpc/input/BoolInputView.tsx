import {ReactElement} from "react";
import {Awaitable} from "../../common/typings";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {WidgetType} from "../widget/Widget";
import {BoolInput} from "./BoolInput";
import {AnyInput, InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";



export type BoolInputViewProps<C extends RpcConnection<BoolInput>> = InputViewProps<C> & {
    children(field: BoolInputView<C>): ReactElement

};


export class BoolInputView<C extends RpcConnection<BoolInput>>
    extends InputView<C, BoolInputViewProps<C>> {

    @ViewState() value: boolean;

    protected updateElement(element: WidgetType<BoolInput>["Element"] | undefined) {
        this.value = element ?? false;
    }

    getValidData(): Awaitable<InputType<BoolInput>["Data"]> {
        return this.value;
    }

    renderView(): React.ReactNode {
        return this.props.children(this)
    }


}
