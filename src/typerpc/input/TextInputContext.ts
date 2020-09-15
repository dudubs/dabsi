import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {InputCheckResult, InputData, InputValue} from "./Input";
import {loadAndCheckString} from "./StringSchema";
import {TextInput} from "./TextInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export function mapProperties<T>(
    obj: T,
    mappers: { [K in keyof T]: boolean }
) {

}

type T = TextInput;

export class TextInputContext
    extends AbstractInputContext<T> {


    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null;
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        return {
            default: await ValueOrAwaitableFn(this.config?.default),
            minLength: this.config.minLength,
            maxLength: this.config.maxLength,
            pattern: this.config.pattern,
            trim: this.config.trim,
            required: this.config.required
        }
    }

    async loadAndCheck(value: InputData<T>):
        Promise<InputCheckResult<T>> {
        return loadAndCheckString(value, this.config)
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        return value
    }


}
