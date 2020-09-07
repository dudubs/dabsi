import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {InputCheckResult, InputType} from "./Input";
import {NumberInput} from "./NumberInput";
import {loadAndCheckNumber} from "./NumberSchema";

export class NumberInputContext<T extends NumberInput<any>>
    extends AbstractNullableInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async loadAndCheckNotNull(data: NonNullable<InputType<T>["Data"]>): Promise<InputCheckResult<T>> {
        return loadAndCheckNumber(data, this.props)
    }

    getElement(): Promise<WidgetElement<T>> {
        return Promise.resolve(undefined);
    }

}
