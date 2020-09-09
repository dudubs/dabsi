import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {BoolInput} from "./BoolInput";
import {InputCheckResult, InputData, InputType} from "./Input";

export class BoolInputContext extends AbstractInputContext<BoolInput> {
    getControllerConfig(): RpcConfig<WidgetController<BoolInput>> {
        return null;
    }

    async getElement(): Promise<WidgetElement<BoolInput>> {
        return this.config.default;
    }

    async loadAndCheck(data: InputData<BoolInput>): Promise<InputCheckResult<BoolInput>> {
        return ({value: Boolean(data)});
    }

}
