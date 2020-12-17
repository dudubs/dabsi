import { Union } from "@dabsi/common/typings2/Union";
import { NoRpc } from "@dabsi/typerpc/NoRpc";
import { RpcConnection, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { Widget, WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { AnyWidgetRecord } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { TabsWidgetHandler } from "@dabsi/typerpc/widget/tabs-widget/TabsWidgetHandler";

export type AnyTabsWidget = TabsWidget<AnyWidgetRecord>;

export type TabsWidget<T extends AnyWidgetRecord> = Widget<{
  Controller: {
    getTabElement<K extends keyof T>(key: K): WidgetElement<T[K]>;
    map: RpcMap<T>;
  };

  Config: RpcUnresolvedConfig<RpcMap<T>>;

  Element: {
    current?: Union<
      {
        [K in keyof T]: {
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
    commands: { getTabElement: true },
  });
}
