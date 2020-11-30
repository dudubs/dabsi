import { Union } from "../../../common/typings2/Union";
import { NoRpc } from "../../NoRpc";
import { RpcConnection, RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../rpc-map/RpcMap";
import { Widget, WidgetElement } from "../Widget";
import { AnyWidgetRecord } from "../widget-map/WidgetMap";
import { TabsWidgetHandler } from "./TabsWidgetHandler";

export type AnyTabsWidget = TabsWidget<AnyWidgetRecord>;

type TabsCommands<T extends AnyWidgetRecord> = {
  getTabElement<K extends keyof T>(key: K): WidgetElement<T[K]>;
};
export type TabsWidget<T extends AnyWidgetRecord> = Widget<{
  TabMap: T;
  Children: {
    map: RpcMap<T>;
  };

  Controller: {
    getTabElement<K extends keyof T>(key: K): WidgetElement<T[K]>;
    map: RpcMap<T>;
  };

  Commands: TabsCommands<T>;

  Connection: TabsCommands<T> & {
    map: RpcConnection<RpcMap<T>>;
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

  Props: {};

  Handler: {};
}>;

export function TabsWidget<T extends AnyWidgetRecord>(
  children: T
): TabsWidget<T> {
  return <any>Widget<AnyTabsWidget>({
    handler: TabsWidgetHandler,
    children: { map: RpcMap(children) },
    connection: {
      getTabElement: conn => conn.$getWidgetCommand("getTabElement"),
      map: conn => conn.$getChildConnection("map"),
    },
  });
}
