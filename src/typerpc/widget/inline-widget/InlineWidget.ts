import {
  Awaitable,
  If,
  Is,
  IsUndefined,
  PartialUndefinedKeys,
  Typing,
} from "../../../common/typings";
import { NoRpc } from "../../NoRpc";
import {
  AnyRpc,
  RpcConnection,
  RpcCommand,
  RpcUnresolvedConfig,
} from "../../Rpc";
import { InlineWidgetHandler } from "./InlineWidgetHandler";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetHandlerClass,
} from "../Widget";

export type TInlineWidget = {
  Target: AnyWidget | undefined;
  Element: object;
  Controller: AnyRpc;
};

export type AnyInlineWidget = InlineWidget<TInlineWidget>;

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
    controllerConfig:
      | RpcUnresolvedConfig<T["Controller"]>
      | If<Is<T["Controller"], NoRpc>, undefined>;

    getElement:
      | (() => Awaitable<T["Element"]>)
      | If<IsUndefined<T["Element"]>, undefined>;
    targetConfig: RpcUnresolvedConfig<Target> | UndefinedTarget;
  }>;
  Handler: {};
  Props: {
    target: T["Target"];
  };
  Element: T["Element"] & {
    target: WidgetElement<Target> | UndefinedTarget;
  };
  Controller: T["Controller"];
  Commands: {
    target: RpcCommand & { handler: "handleTarget" };
  };
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
  element?: Typing<Element>;
}): InlineWidget<T> {
  const { target, controller } = options;
  return Widget<InlineWidget<T>>({
    isGenericConfig: false,
    handler: InlineWidgetHandler as WidgetHandlerClass<InlineWidget<T>>,
    props: { target },
    controller: controller || NoRpc,
    commands: { target: "handleTarget" },
    connection: {
      target() {
        return this.rpc.target?.createRpcConnection((payload) => {
          return this.command("target", payload);
        })!;
      },
    },
  });
}
