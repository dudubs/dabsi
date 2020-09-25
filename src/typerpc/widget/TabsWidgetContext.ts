import {firstEntry} from "../../common/object/firstEntry";
import {RequireOptionalKeys} from "../../common/typings";
import {RpcConfig, RpcError} from "../Rpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {TabsWidget} from "./TabsWidget";
import {WidgetController, WidgetElement} from "./Widget";
import {AnyWidgetMap} from "./WidgetMap";

type T = TabsWidget<AnyWidgetMap>;

export class TabsWidgetContext
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        const [key, widget] = firstEntry(this.controllerProps.items);
        return {
            current: !(key && widget) ? undefined : {
                key, element: await widget.getContext(this.config[key])
                    .getElement()
            }
        }
    }

}
