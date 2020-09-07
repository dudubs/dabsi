import {AbstractWidgetContext} from "../widget/AbstractWidgetContext";
import {AnyInput, BaseInputContext, InputCheckResult, InputType} from "./Input";

export abstract class AbstractInputContext<T extends AnyInput>
    extends AbstractWidgetContext<T>
    implements BaseInputContext<InputType<T>> {

    abstract loadAndCheck(data: InputType<T>["Data"]):
        Promise<InputCheckResult<T>> ;


}
