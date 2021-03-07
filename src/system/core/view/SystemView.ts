import { useSystemView } from "@dabsi/system/core/view/use";
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

const componentMap = new Map();

export function SystemView({
  defaultByType,
  ...props
}: SystemView.AnyProps & {
  defaultByType?: boolean;
}): ReactElement {
  const componentMap = useContext(SystemView.Context);
  const { rpcType } = props.connection.$widget;

  const component =
    (defaultByType ? null : componentMap.get(props.connection.$widget)) ||
    componentMap.get(props.connection.$widget.rpcType);

  if (!component)
    return createElement(
      Fragment,
      null,
      `No system-view for ${props.connection.$path.join("/")}, ${rpcType?.name}`
    );
  return createElement(component, props);
}

export namespace SystemView {
  export const Context = createContext(componentMap);

  export type Props<
    C extends AnyWidgetConnection
  > = C extends AnyInputConnection ? InputViewProps<C> : WidgetViewProps<C>;

  export type AnyProps =
    | WidgetViewProps<AnyWidgetConnection>
    | InputViewProps<AnyInputConnection>;

  export function define<T extends AnyWidget>(
    widget: T,
    component: (props: WidgetViewProps<RpcConnection<T>>) => ReactElement
  ) {
    componentMap.set(widget, component);
  }

  export function render(props: AnyProps): ReactElement {
    return createElement(SystemView, props);
  }

  export const use = useSystemView;
}
