import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {Form, TForm} from "./Form";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "./Widget";

export class FormContext<T extends Form<E>, E extends TForm>
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
