import {entries} from "../common/object/entries";
import {MappedRpc} from "./MappedRpc";
import {RpcConfig, RpcConnection} from "./Rpc";
import {AnyWidget, TWidget, Widget, WidgetType} from "./Widget";
import {WidgetMapContext} from "./WidgetMapContext";

export type AnyWidgetMap = Record<string, AnyWidget>;

export type MapWidgets<T extends AnyWidgetMap,
    P extends keyof TWidget> =
    { [K in keyof T]: WidgetType<T[K]>[P] };


export type WidgetMap<T extends AnyWidgetMap> = Widget<{
    Controller: MappedRpc<T>
    Config: RpcConfig<MappedRpc<T>>
    Element: MapWidgets<T, 'Element'>
    Context: {}
    Connection: RpcConnection<MappedRpc<T>>
    Handler: {}
    Props: { items: T }
}>;


export function WidgetMap<T extends AnyWidgetMap>(items: T): WidgetMap<T> {
    return Widget({
        controller: MappedRpc(items),
        props: {items},
        handler: {},
        getContextClass: () => WidgetMapContext,
        createConnection: props => props.controller,

    })
}
