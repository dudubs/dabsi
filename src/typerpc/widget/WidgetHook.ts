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
import { WidgetHookHandler } from "./WidgetHookHandler";

export type WidgetHook<
  Target extends AnyWidget,
  Element extends object
> = Widget<
  Override<
    WidgetType<Target>,
    {
      WidgetHookTarget: Target;

      Element: [Element, WidgetElement<Target>];

      Config: {
        getElement: (state: WidgetElementState<Target>) => Awaitable<Element>;
        targetConfig: RpcUnresolvedConfig<Target>;
      };
    }
  >
>;

export type AnyWidgetHook = WidgetHook<AnyWidget, any>;

export function WidgetHook<
  Target extends AnyWidget,
  ElementType extends InlineObject
>(
  target: Target,
  element: ElementType
): WidgetHook<Target, InlineObjectType<ElementType>> {
  return RpcHook(target as AnyWidget, WidgetHookHandler);
}
