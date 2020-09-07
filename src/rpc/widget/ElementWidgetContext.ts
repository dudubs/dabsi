import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {ElementWidget} from "./ElementWidget";
import {RpcConfig} from "../Rpc";
import {AnyWidget, WidgetController, WidgetElement} from "./Widget";

export class ElementWidgetContext<E, T extends AnyWidget,
    C extends ElementWidget<E, T>> extends AbstractWidgetContext<C> {

    getControllerConfig(): RpcConfig<WidgetController<C>> {
        return this.config.target;
    }

    async getElement(): Promise<WidgetElement<C>> {
        return [await this.config.getElement(),
            await this.props.controller.getContext(this.config.target).getElement()
        ]
    }

}
