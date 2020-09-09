import {RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {AnyForm} from "./Form";
import {WidgetController, WidgetElement} from "./Widget";

export class FormContext<T extends AnyForm>
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config.input;
    }

    async getElement(): Promise<WidgetElement<T>> {
        return (await this.props.controller
            .getContext(this.config.input))
            .getElement()
    }

}
