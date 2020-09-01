import {RpcConfig} from "./Rpc";
import {NoWidget} from "./RpcConfigurator";
import {AbstractWidgetContext, WidgetController, WidgetElement} from "./Widget";

export class NoWidgetContext extends AbstractWidgetContext<NoWidget> {
    getControllerConfig(): RpcConfig<WidgetController<NoWidget>> {
        return null;
    }

    getElement(): Promise<WidgetElement<NoWidget>> {
        return Promise.resolve(undefined);
    }

}
