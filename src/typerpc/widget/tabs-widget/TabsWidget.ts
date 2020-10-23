import { Union } from "../../../common/typings";
import { RpcConfigOld } from "../../old/Old";
import { RpcMap } from "../../RpcMap";
import { RpcMapHandlerFn } from "../../RpcMapHandlerOld";
import { TabsWidgetContext } from "./TabsWidgetContext";
import { AnyWidget, Widget, WidgetElement } from "../Widget";
import { AnyWidgetMapX } from "../widget-map/WidgetMap";

export type AnyTabsWidget = TabsWidget<AnyWidgetRecord>;

export type TabsWidget<T extends AnyWidgetMapX> = Widget<{
  Tabs: T;

  Controller: RpcMap<T>;

  Connection: {
    getTab<K extends keyof T>(key: K): WidgetElement<T[K]>;
  };

  Handler: {};

  Config: RpcConfigOld<RpcMap<T>>;

  Element: {
    current?: Union<
      {
        [K in string & keyof T]: {
          key: K;
          element: WidgetElement<T[K]>;
        };
      }
    >;
  };

  Props: {};

  Handler: {
    getTab: RpcMapHandlerFn<string, WidgetElement<AnyWidget>>;
  };
}>;

export function TabsWidget<T extends AnyWidgetMapX>(items: T): TabsWidget<T> {
  return <any>Widget<TabsWidget<AnyWidgetMapX>>({
    controller: RpcMap(items),
    context: TabsWidgetContext,
    connection: {
      getTab(key) {
        return this.handler(["getTab", key]);
      },
    },
    handler: {
      getTab(context, key) {
        return context.props.controller
          .getContext(context.config)
          .call("getContext", key)
          .call("getElement");
      },
    },
  });
}
