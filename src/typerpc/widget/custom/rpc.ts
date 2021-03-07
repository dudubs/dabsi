import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { AnyRpc, RpcConfig, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { CustomWidgetHandler } from "@dabsi/typerpc/widget/custom/handler";
import { TWidget, Widget } from "@dabsi/typerpc/widget/Widget";

export type TCustomWidget = {
  Element: TWidget["Element"];
  Controller: AnyRpc;
};

export type AnyCustomWidget = CustomWidget<TCustomWidget>;

export type CustomWidget<T extends TCustomWidget> = Widget<{
  Config: PartialUndefinedKeys<
    {
      controllerConfig: RpcUnresolvedConfig<T["Controller"]>;
    },
    {
      getElement: () => Awaitable<T["Element"]>;
    }
  >;
  Element: T["Element"];
  Controller: {
    controller: T["Controller"];
  };
  Props: {};
  Handler: {};
  ElementState: {};
}>;

export function CustomWidget<
  O extends {
    element: TWidget["Element"];
    controller: AnyRpc;
  }
>({
  controller,
}: O): CustomWidget<{
  Element: O["element"];
  Controller: O["controller"];
}> {
  return <any>Widget({
    isConfigCanBeUndefined: false,
    type: CustomWidget,
    handler: CustomWidgetHandler,
    children: { controller },
  });
}

// CustomWidget({ element: Type<>})
