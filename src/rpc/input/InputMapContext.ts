import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {Awaitable} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement, WidgetType} from "../Widget";
import {AbstractInputContext, TInputCheckResult, InputType, InputCheckResult} from "./Input";
import {AnyInputMap, InputMap} from "./InputMap";

export class InputMapContext<T extends InputMap<E>, E extends AnyInputMap>
    extends AbstractInputContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const [key, input] of entries(this.props.items)) {
            element[key] = await input.getContext(this.config[key]).getElement()
        }
        return element;
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        const error: any = {};
        const value: any = {};
        for (const [key, field] of entries(this.props.items)) {
            const result = await field
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
