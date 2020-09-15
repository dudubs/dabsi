import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {EnumInput} from "./EnumInput";
import {InputCheckResult, InputData, InputValue} from "./Input";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

type T =  EnumInput<string, any>;

export class EnumInputContext
    extends AbstractNullableInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        return {default: await ValueOrAwaitableFn(this.config.default)};
    }

    async loadAndCheckNotNull(data: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
        if (!this.props.keys.has(data)) {
            throw new RpcError(`Invalid enum key ${data}`)
        }
        return {value: data}
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        return value
    }


}
