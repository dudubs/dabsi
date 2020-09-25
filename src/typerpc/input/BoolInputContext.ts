import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {WidgetConfig, WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {BoolInput} from "./BoolInput";
import {InputCheckResult, InputData, InputType, InputValue} from "./Input";

type T = BoolInput;

export class BoolInputContext extends AbstractInputContext<BoolInput> {
    protected getInputConfigForValue(value: InputType<T>["Value"]): WidgetConfig<InputType<T>> {
        return {...this.config, default: value};
    }

    getDataFromValue(value: InputValue<BoolInput>): InputData<BoolInput> {
        return value
    }

    getControllerConfig(): RpcConfig<WidgetController<BoolInput>> {
        return null;
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<BoolInput>>> {
        return {
            default: this.config.default
        };
    }

    async loadAndCheck(data: InputData<BoolInput>): Promise<InputCheckResult<BoolInput>> {
        return ({value: Boolean(data)});
    }

}
