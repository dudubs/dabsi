import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { RpcHook } from "@dabsi/typerpc/RpcHook";
import {
  InlineObject,
  InlineObjectType,
} from "@dabsi/typerpc/widget/InlineObjectType";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetExtraHandler } from "@dabsi/typerpc/widget/WidgetExtraHandler";

// WidgetExtra
export type WidgetExtra<
  Target extends AnyWidget,
  Element extends object
> = Widget<
  Override<
    WidgetType<Target>,
    {
      WidgetExtraTarget: Target;

      Element: WidgetElement<Target> & {
        extra: Element;
      };

      Config: {
        getExtraElement: (
          state: WidgetElementState<Target>
        ) => Awaitable<Element>;
        targetConfig: RpcUnresolvedConfig<Target>;
      };
    }
  >
>;

export type AnyWidgetExtra = WidgetExtra<AnyWidget, any>;

export function WidgetExtra<
  Target extends AnyWidget,
  ElementType extends InlineObject
>(
  target: Target,
  element: ElementType
): WidgetExtra<Target, InlineObjectType<ElementType>> {
  return <any>RpcHook(target as AnyWidget, WidgetExtraHandler);
}
