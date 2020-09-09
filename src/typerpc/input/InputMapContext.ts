import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {InputCheckResult, InputData, InputType} from "./Input";
import {AnyInputMap, InputMap} from "./InputMap";

export class InputMapContext<T extends InputMap<AnyInputMap>>
    extends AbstractInputContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const [key, input] of entries(this.props.controller.props.items)) {
            try {
                element[key] = await input.getContext(this.config?.[key]).getElement()
            } catch (error) {
                console.log(this.config,{key});
                throw error;
            }
        }
        return element;
    }

    async loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
        const error: any = {};
        const value: any = {};
        for (const [key, field] of entries(this.props.controller.props.items)) {
            const result = await field
                .getContext(this.config?.[key])
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
