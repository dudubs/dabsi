import { RpcConfigMap, RpcMap } from "../../rpc-map/RpcMap";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
} from "../Widget";
import { WidgetMapHandler } from "./WidgetMapHandler";

export type AnyWidgetRecord = Record<string, AnyWidget>;

export type AnyWidgetMap = WidgetMap<AnyWidgetRecord>;

export type WidgetMap<T extends AnyWidgetRecord> = Widget<{
  Connection: {};
  Children: T;
  Config: RpcConfigMap<T>;
  Handler: {};
  Props: {
    targetMap: T;
  };
  Element: {
    elementMap: { [K in keyof T]: WidgetElement<T[K]> };
  };
  ElementState: {
    [K in keyof T]?: WidgetElementState<T[K]>;
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
