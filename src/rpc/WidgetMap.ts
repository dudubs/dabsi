import {mapObject} from "../common/object/mapObject";
import {MappedRpc} from "./MappedRpc";
import {RpcConfigType, RpcConnectionType} from "./Rpc";
import {AnyWidget, TWidget, Widget, WidgetType} from "./Widget";

export type AnyWidgetMap = Record<string, AnyWidget>;

export type MapWidgets<T extends AnyWidgetMap,
    P extends keyof TWidget> =
    { [K in keyof T]: WidgetType<T[K]>[P] };


export type WidgetMap<T extends AnyWidgetMap> = Widget<{
    Controller: MappedRpc<T>
    Config: RpcConfigType<MappedRpc<T>>
    Element: MapWidgets<T, 'Element'>
    Context: {}
    Connection: {}
    Handler: {}
    Static: { items: T }
}>;


export function WidgetMap<T extends AnyWidgetMap>(items: T): WidgetMap<T> {
    return Widget({
        controller: MappedRpc(items),
        static: {items},
        handlers: {},
        createConnection: handler => ({}),
        createContext: config => {
            return {
                getControllerConfig: () => config,
                getElement: ():any => {
                    return mapObject(items, (widget, key) => {
                        return widget
                            .getContext(config[key])
                            .getElement()
                    })
                }
            }
        }
    })
}


/*



WidgetMap({

    addUserTo: ....

})








 */
