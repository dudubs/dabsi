import {hasKeys} from "../../common/object/hasKeys";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputCheckResult, InputData} from "./Input";

export class DataInputMapContext<T extends DataInputMap<AnyInput>>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            source: this.config.source,
            getTargetConfig: ($, row) => $(
                this.config.getInputConfig($ => $, row)
            )
        })
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const row of await this.config.source.items()) {
            element[row.$key] = await this.props.input.getContext(
                this.config.getInputConfig($ => $, row)
            ).getElement()
        }
        return element;
    }

    async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
        const value: any = {};
        const error: any = {};
        const keys = Object.keys(data);
        for (const row of await this.config
            .source
            .createAsMutable()
            .filter({$is: keys})
            .items()) {

            const result = await this.props.input
                .getContext(this.config.getInputConfig($ => $, row))
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

