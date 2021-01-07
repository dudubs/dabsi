import { AnyInputConnection } from "@dabsi/typerpc/input/Input";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyWidget, AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import {
  createContext,
  createElement,
  Fragment,
  ReactElement,
  useContext,
} from "react";

export type SystemViewProps<
  C extends AnyWidgetConnection
> = C extends AnyInputConnection ? InputViewProps<C> : WidgetViewProps<C>;

const componentMap = new Map();

export const SystemViewContext = createContext({
  componentMap,
});

type AnySystemViewProps =
  | WidgetViewProps<AnyWidgetConnection>
  | InputViewProps<AnyInputConnection>;

export function SystemView<T extends AnyWidget>(
  widget: T,
  component: (props: WidgetViewProps<RpcConnection<T>>) => ReactElement
) {
  componentMap.set(widget, component);
}

export namespace SystemView {
  export function render(props: AnySystemViewProps): ReactElement {
    return createElement(Component, props);
  }
  export function Component(props: AnySystemViewProps): ReactElement {
    const context = useContext(SystemViewContext);
    const { rpcType } = props.connection.$widget;

    const component =
      context.componentMap.get(props.connection.$widget) ||
      context.componentMap.get(props.connection.$widget.rpcType);

    if (!component)
      return createElement(
        Fragment,
        null,
        `No system-view for ${props.connection.$path.join("/")}, ${
          rpcType?.name
        }`
      );
    return createElement(component, props);
  }
}

export default SystemView;
