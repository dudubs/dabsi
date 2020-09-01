import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../Widget";
import {AbstractInputContext, InputCheckResult, InputType} from "./Input";
import {TextInput} from "./TextInput";

export class TextInputContext<T extends TextInput<never>>
    extends AbstractInputContext<T> {


    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null;
    }

    async getElement(): Promise<WidgetElement<T>> {
        return this.config?.default || ""
    }

    async loadAndCheck(data: InputType<T>["Data"]):
        Promise<InputCheckResult<T>> {
        let value = String(data || "");
        if (this.props.trim) {
            value = value.trim();
        }
        if (this.props.pattern && !this.props.pattern.test(value)) {
            return {error: "INVALID_PATTERN" as const}
        }
        const error = await this.config?.check?.(value);
        if (error)
            return {error};

        return {value}
    }


}
