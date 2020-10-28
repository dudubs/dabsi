import { Union } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../rpc-map/RpcMap";
import { AnyWidget, Widget, WidgetElement } from "../Widget";
import { AnyWidgetRecord } from "../widget-map/WidgetMap";
import { TabsWidgetHandler } from "./TabsWidgetHandler";

export type AnyTabsWidget = TabsWidget<AnyWidgetRecord>;

export type TabsWidget<T extends AnyWidgetRecord> = Widget<{
  TabMap: T;

  Controller: RpcMap<T>;

  Commands: {
    getTab: {
      (key: string): WidgetElement<AnyWidget>;
      handler: "handleGetTab";
    };
  };
  Connection: {
    getTab<K extends keyof T>(key: K): WidgetElement<T[K]>;
  };

  Config: RpcUnresolvedConfig<RpcMap<T>>;

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

  Props: {
    tabMap: T;
  };

  Handler: {};
}>;

export function TabsWidget<T extends AnyWidgetRecord>(
  tabMap: T
): TabsWidget<T> {
  return <any>Widget<AnyTabsWidget>({
    controller: RpcMap(tabMap),
    handler: TabsWidgetHandler,
    commands: { getTab: "handleGetTab" },
    props: { tabMap },
    connection: {
      getTab: conn => key => conn.command("getTab", key),
    },
  });
}
