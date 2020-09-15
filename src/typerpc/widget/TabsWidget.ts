import {Union} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {RpcMap} from "../RpcMap";
import {RpcMapHandlerFn} from "../RpcMapHandler";
import {TabsWidgetContext} from "./TabsWidgetContext";
import {AnyWidget, Widget, WidgetElement} from "./Widget";
import {AnyWidgetMap} from "./WidgetMap";

export type TabsWidget<T extends AnyWidgetMap> = Widget<{

    Tabs: T;

    Controller: RpcMap<T>

    Connection: {
        getTab<K extends keyof T>(key: K): WidgetElement<T[K]>
    }

    Context: {}

    Config: RpcConfig<RpcMap<T>>

    Element: {
        current?: Union<{
            [K in string & keyof T]: {
                key: K,
                element: WidgetElement<T[K]>
            }
        }>
    }

    Props: {}

    Handler: {
        getTab: RpcMapHandlerFn<string, WidgetElement<AnyWidget>>
    }
}>;

export function TabsWidget<T extends AnyWidgetMap>(
    items: T
): TabsWidget<T> {
    return <any>Widget<TabsWidget<AnyWidgetMap>>({
        controller: RpcMap(items),
        context: TabsWidgetContext,
        connection: {
            getTab(key) {
                return this.handler(["getTab", key])
            }
        },
        handler: {
            getTab(context, key) {
                return context.props.controller
                    .getContext(context.config)
                    .getContext(key)
                    .getElement()
            }
        }
    })
}
