import {NoWidget} from "./NoWidget";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "./Widget";

export class NoWidgetContext extends AbstractWidgetContext<NoWidget> {
    getControllerConfig(): RpcConfig<WidgetController<NoWidget>> {
        return null;
    }

    getElement(): Promise<WidgetElement<NoWidget>> {
        return Promise.resolve(undefined);
    }

}
