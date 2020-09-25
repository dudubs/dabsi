import {entries} from "../../common/object/entries";
import {RequireOptionalKeys} from "../../common/typings";
import {ContextualRpcContext, ContextualRpcType} from "../ContextualRpc";
import {AbstractWidgetContext} from "./AbstractWidgetContext";
import {RpcConfig, RpcError} from "../Rpc";
import {AnyWidget, WidgetController, WidgetElement} from "./Widget";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";


export class WidgetMapContext<T extends WidgetMap<AnyWidgetMap>>
    extends AbstractWidgetContext<T>
    implements ContextualRpcContext<WidgetMap<AnyWidgetMap>> {


    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return this.config;
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        const element: any = {};
        for (const [key, widget] of entries(this.controllerProps.items)) {
            element[key] = await widget.getContext(this.config[key]).getElement()
        }
        return element;
    }

    getContext(key: string): ContextualRpcContext<AnyWidget> {
        const item = this.controllerProps.items[key];
        if (!item)
            throw new RpcError(`No item like "${key}".`)

        return item.getContext(this.config[key])
    }

}
