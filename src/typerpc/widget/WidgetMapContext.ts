import {entries} from "../../common/object/entries";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "./Widget";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";

export class WidgetMapContext<T extends WidgetMap<AnyWidgetMap>>
    extends AbstractWidgetContext<T> {

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<WidgetElement<T>> {
        const element: any = {};
        for (const [key, widget] of entries(this.props.controller.props.items)) {
            element[key] = await  widget.getContext(this.config?.[key]).getElement()
        }
        return element;
    }

}
