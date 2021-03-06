import assignDescriptors from "@dabsi/common/object/assignDescriptors";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { RpcType } from "@dabsi/typerpc/Rpc";
import { InferredHandlerConfig, RpcWithConfig } from "@dabsi/typerpc/RpcConfig";
import {
  BaseRpcConfigHandler,
  InferredRpcHandlerConfig,
  RpcConfigHandler,
  RpcConfigHandlerOptions,
  RpcConfigHandlerType,
  RpcHandlerProps,
} from "@dabsi/typerpc/RpcConfigHandler";
import { RpcHandler } from "@dabsi/typerpc/RpcHandler";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc/widget/Widget";

export type BaseWidgetHandler<T extends AnyWidget> = {
  getElement(state: WidgetState<T> | undefined): Awaitable<WidgetElement<T>>;
};

// declare module "./Widget" {
//   interface AnyWidget
//     extends RpcWithHandler<
//       // BaseRpcConfigHandler<any, any> &
//       BaseWidgetHandler<any>
//     > {}
// }
export type WidgetHandler<
  T extends AnyWidgetWithConfig,
  C
> = BaseRpcConfigHandler<T, C> & BaseWidgetHandler<T>;

export type WidgetWithConfig<
  T extends AnyWidget,
  C,
  H = {},
  HC = InferredHandlerConfig<C>
> = RpcWithConfig<C, BaseWidgetHandler<T> & H, HC>;

export type WidgetHandlerProps<T extends AnyWidget> = Omit<
  RpcHandlerProps<T>,
  "handleGetElement"
>;

export type AnyWidgetWithConfig<
  T extends AnyWidget = AnyWidget,
  C = any,
  H = {}
> = T & WidgetWithConfig<T, C, H>;

export type WidgetHandlerOptions<
  R extends AnyWidgetWithConfig,
  E,
  OH = {},
  RH = {},
  C = InferredRpcHandlerConfig<R>
> = RpcConfigHandlerOptions<R, E, OH, RH, C>;

export function WidgetHandler<
  T extends AnyWidgetWithConfig,
  H extends WidgetHandlerProps<T>,
  E = {}
>(
  rpcType: RpcType<T>,
  options: WidgetHandlerOptions<T, E>,
  handler: H & ThisType<WidgetHandler<T, InferredRpcHandlerConfig<T>> & E>
): RpcConfigHandlerType<T, H & E>;

export function WidgetHandler(
  rpcType: RpcType<AnyWidgetWithConfig>,
  options: WidgetHandlerOptions<AnyWidgetWithConfig, {}>,
  handler: WidgetHandlerProps<AnyWidgetWithConfig>
) {
  const baseHandler: Pick<RpcHandler<AnyWidgetWithConfig>, "handleGetElement"> &
    ThisType<BaseWidgetHandler<AnyWidget>> = {
    handleGetElement(state) {
      return this.getElement(state);
    },
  };

  return RpcConfigHandler(
    rpcType,
    options,
    assignDescriptors(baseHandler, handler)
  );
}
