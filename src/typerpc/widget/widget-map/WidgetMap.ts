import { RpcConfig } from "@dabsi/typerpc/Rpc";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetMapHandler } from "@dabsi/typerpc/widget/widget-map/WidgetMapHandler";

export type AnyWidgetRecord = Record<string, AnyWidget>;

export type AnyWidgetMap = WidgetMap<AnyWidgetRecord>;

export type WidgetMap<T extends AnyWidgetRecord> = Widget<{
  Controller: { map: RpcMap<T> };
  Config: RpcConfig<RpcMap<T>>;
  Handler: {};
  Props: {};
  Element: {
    elementMap: { [K in keyof T]: WidgetElement<T[K]> };
  };
  ElementState: {
    [K in keyof T]?: WidgetElementState<T[K]>;
  };
}>;

export function WidgetMap<T extends AnyWidgetRecord>(
  children: T
): WidgetMap<T> {
  return <any>Widget<WidgetMap<AnyWidgetRecord>>({
    handler: WidgetMapHandler,
    isConfigCanBeUndefined: false,
    type: WidgetMap,
    children: {
      map: RpcMap(children as AnyWidgetRecord),
    },
  });
}
