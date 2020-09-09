import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {InputCheckResult, InputData, InputType} from "./Input";
import {SelectInput} from "./SelectInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export class SelectInputContext<T extends SelectInput<any, any>>
    extends AbstractNullableInputContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async getElement(): Promise<WidgetElement<T>> {

        return {
            default: await ValueOrAwaitableFn(this.config.default),
            options: await ValueOrAwaitableFn(this.config.options)
        }
    }

    loadAndCheckNotNull(data: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
        return this.config.load(data);
    }


}
