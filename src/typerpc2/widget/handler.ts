import { Awaitable } from "@dabsi/common/typings2/Async";
import { SafeOmit } from "@dabsi/common/typings2/OmitKeys";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import {
  RpcConfigHandler,
  RpcConfigHandlerType,
} from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler, RpcWithHandler } from "@dabsi/typerpc2/RpcHandler";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
  WidgetType,
} from "@dabsi/typerpc2/widget/rpc";

export type WidgetWithConfig<
  T extends AnyWidget,
  C,
  H = {}
> = RpcWithConfig<C> &
  RpcWithHandler<
    H & {
      getElement(
        state: WidgetState<T> | undefined
      ): Awaitable<WidgetElement<T>>;
    }
  >;

export type AnyWidgetWithConfig<
  T extends AnyWidget = AnyWidget,
  C = any,
  H = any
> = AnyWidget & WidgetWithConfig<T, C, H>;

export type WidgetHandler<
  R extends AnyWidgetWithConfig,
  H,
  E,
  OH = {},
  RH = {}
> = RpcConfigHandler<R, H, E, OH, RH>;

export type BaseWidgetHandler<T extends AnyWidget> = RpcHandler<
  SafeOmit<T, "getElement">
> & {
  getElement(state: WidgetState<T> | undefined): Awaitable<WidgetElement<T>>;
};

export declare function WidgetHandler<
  T extends AnyWidgetWithConfig,
  H extends BaseWidgetHandler<T>,
  E extends object = {}
>(
  widgetType: WidgetType<T>,
  widgetHandler: WidgetHandler<T, H, E>
): RpcConfigHandlerType<T, H>;
