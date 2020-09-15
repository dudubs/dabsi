import {ValueOrAwaitableFn} from "../input/ValueOrAwaitableFn";
import {AnyRpc, RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {CustomWidget} from "./NoWidget";
import {WidgetController, WidgetElement} from "./Widget";

export class CustomWidgetContext<T extends CustomWidget<any, AnyRpc>> extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.getControllerConfig()
    }

    getElement(): Promise<WidgetElement<T>> {
        return ValueOrAwaitableFn(this.config.element)
    }

}
