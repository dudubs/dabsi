import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {InputCheckResult, InputData, InputType, InputValue} from "./Input";
import {NumberInput} from "./NumberInput";
import {loadAndCheckNumber} from "./NumberSchema";

type T = NumberInput<any>;

export class NumberInputContext
    extends AbstractNullableInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async loadAndCheckNotNull(value: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
        if (!this.config)
            return {value}
        return loadAndCheckNumber(value, this.config!)
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        return {
            default: this.config.default,
            max: this.config.max,
            min: this.config.min,
            step: this.config.step
        }
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        return value;
    }

}
