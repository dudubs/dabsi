import { mapObject } from "../../../common/object/mapObject";
import { Union } from "../../../common/typings2/Union";
import { RpcConnection, RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../rpc-map/RpcMap";
import { AnyWidget, Widget, WidgetElement } from "../Widget";
import { AnyWidgetRecord } from "../widget-map/WidgetMap";
import { TabsWidgetHandler } from "./TabsWidgetHandler";

export type AnyTabsWidget = TabsWidget<AnyWidgetRecord>;

export type TabsWidget<T extends AnyWidgetRecord> = Widget<{
  TabMap: T;
  Children: {};
  Controller: RpcMap<T>;

  Commands: {
    getTabElement: {
      (key: string): WidgetElement<AnyWidget>;
      handler: "handleGetTabElement";
    };
  };

  Connection: {
    getTabElement<K extends keyof T>(key: K): WidgetElement<T[K]>;
    tabs: { [K in keyof T]: RpcConnection<T[K]> };
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

  ElementState: {
    currentTab?: {
      key: string;
      state: any;
    };
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
    commands: { getTabElement: "handleGetTabElement" },
    props: { tabMap },
    connection: {
      getTabElement: conn => key => conn.command("getTabElement", key),
      tabs: conn => conn.controller,
    },
  });
}
