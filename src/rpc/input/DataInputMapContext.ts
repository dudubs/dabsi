import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputCheckResult, InputType} from "./Input";
import {AnyInputMap, InputMap} from "./InputMap";

export class DataInputMapContext<T extends DataInputMap<AnyInput>>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            source: this.config.source,
            getTargetConfig: row =>
                this.config.getInputConfig(row)
        })
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const row of await this.config.source.items()) {
            element[row.$key] = await this.props.input.getContext(
                this.config.getInputConfig(row)
            ).getElement()
        }
        return element;
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        const value: any = {};
        const error: any = {};
        const keys = Object.keys(data);
        for (const row of await this.config
            .source
            .createAsMutable()
            .filter({$is: keys})
            .items()) {

            const result = await  this.props.input
                .getContext(this.config.getInputConfig(row))
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

export class InputMapContext<T extends InputMap<E>, E extends AnyInputMap>
    extends AbstractInputContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const [key, input] of entries(this.props.controller.props.items)) {
            element[key] = await input.getContext(this.config[key]).getElement()
        }
        return element;
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        const error: any = {};
        const value: any = {};
        for (const [key, field] of entries(this.props.controller.props.items)) {
            const result = await  field
                .getContext(this.config[key])
                .loadAndCheck(data[key]);
            if ('error' in result) {
                error[key] = result.error;
            } else {
                value[key] = result.value;
            }
        }
        return hasKeys(error) ? {error} : {value};
    }

}
