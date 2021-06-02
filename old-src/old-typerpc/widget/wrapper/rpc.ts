import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { RpcConfig, RpcUnresolvedConfig } from "@dabsi/old-typerpc/Rpc";
import { RpcHook } from "@dabsi/old-typerpc/RpcHook";
import {
  AnyWidget,
  TWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "@dabsi/old-typerpc/widget/Widget";
import { WidgetWrapperHandler } from "@dabsi/old-typerpc/widget/wrapper/handler";

export type TWidgetWrapper = {
  Element: TWidget["Element"];
  Target: AnyWidget;
};

export type AnyWidgetWrapper = WidgetWrapper<{
  Element: any;
  Target: AnyWidget;
}>;

export type WidgetWrapper<T extends TWidgetWrapper> = Widget<
  Override<
    WidgetType<T["Target"]>,
    {
      TWidgetWrapper: T;

      Element: Override<WidgetElement<T["Target"]>, T["Element"]>;
      Config: RpcConfig<T["Target"]> & {
        getWrapperElement: ConfigFactory<
          T["Element"],
          WidgetElementState<T["Target"]>
        >;
      };
    }
  >
>;

export function WidgetWrapper<
  O extends {
    element: TWidget["Element"];
    target: AnyWidget;
  }
>({
  target,
}: O): WidgetWrapper<{
  Element: O["element"];
  Target: O["target"];
}> {
  return <any>RpcHook(target, WidgetWrapperHandler);
}

// WidgetWrapper({ element: Type<>})
