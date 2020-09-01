import {DataSource} from "../../data/DataSource";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../Widget";
import {DataSelectInput} from "./DataSelectInput";
import {AbstractInputContext, InputCheckResult, InputType} from "./Input";

export class DataSelectInputContext<C extends DataSelectInput<T>, T>
    extends AbstractInputContext<C> {
    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return null
    }

    async getElement(): Promise<WidgetElement<C>> {
        const options: any[] = await this.config.source
            .pick({label: this.config.labelField})
            .items();

        return {
            options,
            default: this.config.default
        }
    }

    async loadAndCheck(data: InputType<C>["Data"]): Promise<InputCheckResult<C>> {
        if (!data) {
            if (this.props?.required) {
                return {error: "REQUIRED"}
            }
            return {value: null}
        }
        return {
            value: await this.config.source.getOrFail(
                <string>data)
        }
    }

}
