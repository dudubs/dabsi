import {ReactElement} from "react";
import {Awaitable} from "../../common/typings";
import {ViewState} from "../../react/view/ViewState";
import {WidgetType} from "../widget/Widget";
import {InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";
import {BoolInput} from "./TextInput";


export type BoolInputViewProps = InputViewProps<BoolInput> & {
    children(field: BoolInputView): ReactElement

};


export class BoolInputView
    extends InputView<BoolInput, BoolInputViewProps> {

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
