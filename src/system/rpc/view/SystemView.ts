import { AnyInputConnection } from "@dabsi/typerpc/input/Input";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import { AnyWidget, AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import {
  createContext,
  createElement,
  Fragment,
  ReactElement,
  useContext,
} from "react";

export type WidgetFactory<T extends AnyWidget> = (...args: any[]) => T;

export type SystemViewProps<
  C extends AnyWidgetConnection
> = C extends AnyInputConnection ? InputViewProps<C> : WidgetViewProps<C>;

export type SystemViewContext = Map<any, any>;
export const SystemViewContext = createContext(new Map());

export function SystemView(
  props:
    | WidgetViewProps<AnyWidgetConnection>
    | InputViewProps<AnyInputConnection>
): ReactElement {
  const context = useContext(SystemViewContext);
  const { rpcType } = props.connection.$widget;
  const component =
    context.get(props.connection.$widget) ||
    context.get(props.connection.$widget.rpcType);

  if (!component)
    return createElement(
      Fragment,
      null,
      `No system-view for ${props.connection.$path.join("/")}, ${rpcType?.name}`
    );
  return createElement(component, props);
}
