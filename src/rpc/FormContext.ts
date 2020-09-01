import {Form, TForm} from "./Form";
import {RpcConfig} from "./Rpc";
import {AbstractWidgetContext, WidgetController, WidgetElement} from "./Widget";

export class FormContext<T extends Form<E>, E extends TForm>
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return undefined;
    }

    getElement(): Promise<WidgetElement<T>> {
        return this.props.input
            .getContext(this.config.input)
            .getElement()
    }

}
