import {entries} from "../common/object/entries";
import {RpcConfig} from "./Rpc";
import {AbstractWidgetContext, WidgetController, WidgetElement} from "./Widget";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";

export class WidgetMapContext<T extends WidgetMap<E>, E extends AnyWidgetMap>
    extends AbstractWidgetContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const [key, widget] of entries(this.props.items)) {
            element[key] = await widget.getContext(this.config[key]).getElement()
        }
        return element;
    }

}
