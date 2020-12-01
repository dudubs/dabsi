import { Awaitable } from "../../common/typings2/Async";
import { Override } from "../../common/typings2/Override";
import { RpcUnresolvedConfig } from "../Rpc";
import { RpcHook } from "../RpcHook";
import { InlineObject, InlineObjectType } from "./InlineObjectType";
import {
  AnyWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "./Widget";
import { WidgetExtraHandler } from "./WidgetExtraHandler";

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
