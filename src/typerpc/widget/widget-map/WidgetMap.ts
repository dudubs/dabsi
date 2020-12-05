import { mapObject } from "../../../common/object/mapObject";
import { NoRpc } from "../../NoRpc";
import { RpcConfig, RpcConnection } from "../../Rpc";
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
    type: WidgetMap,
    children: {
      map: RpcMap(children),
    },
  });
}
