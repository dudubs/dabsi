import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {AnyForm} from "./Form";
import {WidgetController, WidgetElement} from "./Widget";

type T = AnyForm;

export class FormContext
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config.input;
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        return (await this.props.controller
            .getContext(this.config.input))
            .getElement()
    }

}
