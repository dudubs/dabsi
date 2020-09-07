import {RpcMap} from "../RpcMap";
import {RpcConfig} from "../Rpc";
import {AnyWidget, TWidget, Widget, WidgetType} from "./Widget";
import {WidgetMapContext} from "./WidgetMapContext";

export type AnyWidgetMap = Record<string, AnyWidget>;

export type MapWidgets<T extends AnyWidgetMap,
    P extends keyof TWidget> =
    { [K in keyof T]: WidgetType<T[K]>[P] };


export type WidgetMap<T extends AnyWidgetMap> = Widget<{
    Controller: RpcMap<T>
    Config: RpcConfig<RpcMap<T>>
    Element: MapWidgets<T, 'Element'>
    Context: {}
    Connection: {}
    Handler: {}
    Props: {}
}>;


export function WidgetMap<T extends AnyWidgetMap>(items: T): WidgetMap<T> {
    return <any>Widget<WidgetMap<AnyWidgetMap>>({
        controller: RpcMap(items),
        getContextClass: () => WidgetMapContext,
    })
}
