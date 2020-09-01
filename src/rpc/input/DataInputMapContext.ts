import {hasKeys} from "../../common/object/hasKeys";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../Widget";
import {DataInputMap} from "./DataInputMap";
import {AbstractInputContext, AnyInput, InputCheckResult, InputType} from "./Input";

export class DataInputMapContext<T extends DataInputMap<I>, I extends AnyInput>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            source: this.genericConfig.source,
            getTargetConfig: row =>
                this.genericConfig.getInputConfig(row)
        });
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const row of await this.genericConfig.source.items()) {
            element[row.$key] = await this.props.input.getContext(
                this.genericConfig.getInputConfig(row)
            ).getElement()
        }
        return element;
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        const value: any = {};
        const error: any = {};
        const keys = Object.keys(data);
        for (const row of await this.genericConfig
            .source
            .createAsMutable()
            .filter({$is: keys})
            .items()) {

            const result = await this.props.input
                .getContext(this.genericConfig.getInputConfig(row))
                .loadAndCheck(data[row.$key])

            if ('error' in result) {
                error[row.$key] = result.error;
            } else {
                value[row.$key] = result.value;
            }
        }

        return hasKeys(error) ? {error} : {value};
    }

}
