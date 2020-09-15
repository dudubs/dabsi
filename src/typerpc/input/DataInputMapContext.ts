import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {RpcConfigFactory} from "../RpcGenericConfig";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputCheckResult, InputData, InputValue} from "./Input";

type T = DataInputMap<AnyInput>;
export class DataInputMapContext
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            source: this.config.source,
            getTargetConfig: ($, row) => $(
                RpcConfigFactory(this.config.getInputConfig, row)
            )
        })
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>>{
        const element: any = {};
        if (this.config.loadAllData)
            for (const row of await this.config.source.items()) {
                element[row.$key] = await this.props.controller.target.getContext(
                    RpcConfigFactory(this.config.getInputConfig, row)
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

            const result = await this.props.controller.target
                .getContext(RpcConfigFactory(this.config.getInputConfig, row))
                .loadAndCheck(data[row.$key])

            if ('error' in result) {
                error[row.$key] = result.error;
            } else {
                value[row.$key] = result.value;
            }
        }

        return hasKeys(error) ? {error} : {value};
    }

    getDataFromValue(keyToValue: InputValue<T>): InputData<T> {
        throw new Error()
        // const data: Record<string, any> = {};
        // for (const [key, value] of entries(keyToValue)) {
        //     data[key] = this.props.controller.target
        //         .getContext(
        //             RpcConfigFactory(this.config.getInputConfig, value)
        //         )
        //         .getDataFromValue(value)
        // }
        //
        // return data;
    }

}

