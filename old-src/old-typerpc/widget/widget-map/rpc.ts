import { Expect } from "@dabsi/common/typings2/Expect";
import { AnyRpc, RpcConfig } from "@dabsi/old-typerpc/Rpc";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/old-typerpc/widget/Widget";
import { WidgetMapHandler } from "@dabsi/old-typerpc/widget/widget-map/handler";

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
    get?: (string & keyof T)[];
    stateMap?: { [K in keyof T]?: WidgetElementState<T[K]> };
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
