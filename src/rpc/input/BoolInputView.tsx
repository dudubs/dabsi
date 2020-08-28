import {ReactElement} from "react";
import {Awaitable} from "../../common/typings";
import {ViewState} from "../../react/view/ViewState";
import {BaseInputView} from "./BaseInputView";
import {InputType} from "./Input";
import {InputViewProps} from "./InputView";
import {BoolInput} from "./TextInput";


export type BoolInputViewProps = InputViewProps<BoolInput> & {
    children(field: BoolInputView): ReactElement

};


export class BoolInputView
    extends BaseInputView<BoolInput, BoolInputViewProps> {

    @ViewState() value: boolean;


    getValidData(): Awaitable<InputType<BoolInput>["Data"]> {
        return this.value;
    }

    setBaseElement(element: InputType<BoolInput>["Element"] | null) {

        this.value = element ?? false;
    }


    renderView(): React.ReactNode {
        return this.props.children(this)
    }


}
