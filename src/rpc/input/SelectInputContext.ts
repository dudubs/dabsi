import {RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {InputCheckResult, InputType} from "./Input";
import {SelectInput} from "./SelectInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export class SelectInputContext<T extends SelectInput<any, any>>
    extends AbstractInputContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async getElement(): Promise<WidgetElement<T>> {


        return {
            default: await ValueOrAwaitableFn(this.config.default),
            options: await ValueOrAwaitableFn(this.config.options)
        }
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {

        if (!data) {
            if (!this.props.nullable) {
                return {error: "REQUIRED"}
            }
            return {value: null}
        } else {
            const value = await this.config.load(data!);
            if (value == null && !this.props.nullable)
                throw new RpcError(`Invalid option key`)
            return {value}
        }
    }

}
