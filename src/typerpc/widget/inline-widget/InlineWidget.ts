import { Awaitable } from "../../../common/typings2/Async";
import { If, IsUndefined } from "../../../common/typings2/boolean";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { NoRpc } from "../../NoRpc";
import {
  _RpcConnection,
  _RpcUnresolvedConfig,
  AnyRpc,
  RpcCommand,
  RpcConnection,
  RpcType,
  RpcUnresolvedConfig,
  TRpc,
} from "../../Rpc";
import {
  AnyWidget,
  TWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetHandlerClass,
  WidgetType,
} from "../Widget";
import { InlineWidgetHandler } from "./InlineWidgetHandler";

export type TInlineWidget = {
  Target: AnyWidget | undefined;
  Element: object;
  Controller: AnyRpc;
};

export type AnyInlineWidget = InlineWidget<TInlineWidget>;

export declare namespace InlineWidget {
  type WithElement<
    Target extends AnyWidget,
    Element extends object
  > = InlineWidget<{ Controller: NoRpc; Target: Target; Element: Element }>;
}
export type InlineWidget<
  T extends TInlineWidget,
  Target extends AnyWidget = NonNullable<T["Target"]>,
  UndefinedTarget extends undefined = If<IsUndefined<T["Target"]>, undefined>
> = Widget<{
  TInlineWidget: T;
  Connection: {
    target: RpcConnection<Target> | UndefinedTarget;
  };
  Config: PartialUndefinedKeys<{
    controllerConfig: RpcUnresolvedConfig<T["Controller"]>;

    getElement:
      | (() => Awaitable<T["Element"]>)
      | If<IsUndefined<T["Element"]>, undefined>;
    targetConfig: RpcUnresolvedConfig<Target> | UndefinedTarget;
  }>;
  Handler: {};
  Props: {
    inlineTarget: T["Target"];
  };
  Element: [T["Element"], WidgetElement<Target> | UndefinedTarget];
  Controller: T["Controller"];
  Children: {};

  Commands: {
    target: RpcCommand & { handler: "handleTarget" };
  };
  ElementState: WidgetElementState<Target>;
}>;

export function InlineWidget<
  Target extends AnyWidget | undefined = undefined,
  Controller extends AnyRpc = NoRpc,
  Element extends object = {},
  T extends TInlineWidget = {
    Element: Element;
    Controller: Controller;
    Target: Target;
  }
>(options: {
  target?: Target;
  controller?: Controller;
  element?: Element;
}): InlineWidget<T> {
  const { target, controller } = options;
  return Widget<InlineWidget<T>>({
    isGenericConfig: false,
    handler: InlineWidgetHandler as WidgetHandlerClass<InlineWidget<T>>,
    props: { inlineTarget: target },
    controller: controller || NoRpc,
    commands: { target: "handleTarget" },
    connection: {
      target(conn) {
        return conn.rpc.inlineTarget?.createRpcConnection(payload => {
          return conn.command("target", payload);
        })!;
      },
    },
  });
}
