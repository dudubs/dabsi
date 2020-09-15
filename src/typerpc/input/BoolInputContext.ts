import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {BoolInput} from "./BoolInput";
import {InputCheckResult, InputData, InputType, InputValue} from "./Input";

export class BoolInputContext extends AbstractInputContext<BoolInput> {

    getDataFromValue(value: InputValue<BoolInput>): InputData<BoolInput> {
        throw new Error()
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
