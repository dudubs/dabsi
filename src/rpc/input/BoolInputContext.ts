import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../Widget";
import {BoolInput} from "./BoolInput";
import {AbstractInputContext, InputCheckResult, InputType} from "./Input";

export class BoolInputContext extends AbstractInputContext<BoolInput> {
    getControllerConfig(): RpcConfig<WidgetController<BoolInput>> {
        return null;
    }

    async getElement(): Promise<WidgetElement<BoolInput>> {
        return this.config.default;
    }

    async loadAndCheck(data: InputType<BoolInput>["Data"]): Promise<InputCheckResult<BoolInput>> {
        return ({value: Boolean(data)});
    }

}

