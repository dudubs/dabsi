import {AbstractWidgetContext} from "../widget/AbstractWidgetContext";
import {AnyInput, BaseInputContext, InputCheckResult, InputData, InputType} from "./Input";

export abstract class AbstractInputContext<T extends AnyInput>
    extends AbstractWidgetContext<T>
    implements BaseInputContext<InputType<T>> {

    abstract loadAndCheck(data: InputData<T>):
        Promise<InputCheckResult<T>> ;


}
