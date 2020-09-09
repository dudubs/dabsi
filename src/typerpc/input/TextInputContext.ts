import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {InputCheckResult, InputData, InputType} from "./Input";
import {loadAndCheckString} from "./StringSchema";
import {TextInput} from "./TextInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export class TextInputContext<T extends TextInput>
    extends AbstractInputContext<T> {



    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null;
    }

    async getElement(): Promise<WidgetElement<T>> {
        return (await ValueOrAwaitableFn(this.config?.default)) || ""
    }

    async loadAndCheck(data: InputData<T>):
        Promise<InputCheckResult<T>> {
        return  loadAndCheckString(data,this.props)
    }


}
