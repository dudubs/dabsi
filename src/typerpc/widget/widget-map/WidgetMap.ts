import { RpcConnection, RpcHandlerClass, RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../RpcMap";
import { AnyWidget, Widget, WidgetElement } from "../Widget";
import { WidgetMapHandler } from "./WidgetMapHandler";

export type AnyWidgetRecord = Record<string, AnyWidget>;

export type AnyWidgetMap = WidgetMap<AnyWidgetRecord>;

export type WidgetMap<T extends AnyWidgetRecord> = Widget<{
  Connection: RpcConnection<RpcMap<T>>;
  Config: RpcUnresolvedConfig<RpcMap<T>>;
  Handler: {};
  Props: { targetMap: T };
  Element: {
    elementMap: { [K in keyof T]: WidgetElement<T[K]> };
  };
  Controller: RpcMap<T>;
  Commands: {};
}>;

export function WidgetMap<T extends AnyWidgetRecord>(
  targetMap: T
): WidgetMap<T> {
  return <any>Widget<WidgetMap<AnyWidgetRecord>>({
    props: { targetMap },
    controller: RpcMap(targetMap),
    handler: WidgetMapHandler,
  });
}
