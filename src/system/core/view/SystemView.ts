import { entries } from "@dabsi/common/object/entries";
import { useSystemView } from "@dabsi/system/core/view/use";
import { AnyInput, AnyInputConnection } from "@dabsi/typerpc/input/Input";
import { InputViewProps } from "@dabsi/typerpc/input/InputView";
import {
  AnyRpc,
  RpcChild,
  RpcChildren,
  RpcConnection,
} from "@dabsi/typerpc/Rpc";
import { WidgetViewProps } from "@dabsi/typerpc/widget/view/component";
import { AnyWidget, AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import {
  createContext,
  createElement,
  Fragment,
  ReactElement,
  useContext,
} from "react";

// TODO: SystemLoaderView wrapper?(element)

const componentMap = new Map();

export function SystemView<C extends AnyWidgetConnection>({
  defaultByType,
  ...props
}: SystemView.Props<C>): ReactElement {
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

type DefintionComponent<T extends AnyWidget> = React.ComponentType<
  T extends AnyInput
    ? InputViewProps<RpcConnection<T>>
    : WidgetViewProps<RpcConnection<T>>
>;

type DefintionChildren<T extends AnyRpc> = {
  [K in keyof RpcChildren<T>]?: Definition<RpcChild<T, K>>;
};

type Definition<T extends AnyRpc> =
  | (T extends AnyWidget
      ?
          | DefintionComponent<T>
          | DefintionChildren<T>
          | [DefintionComponent<T>, DefintionChildren<T>]
          | [DefintionChildren<T> | DefintionComponent<T>]
      : never)
  | DefintionChildren<T>;

export namespace SystemView {
  export const Context = createContext(componentMap);

  export type Props<
    C extends AnyWidgetConnection,
    E = {
      defaultByType?: boolean;
    }
  > = C extends AnyInputConnection
    ? InputViewProps<C> & E
    : WidgetViewProps<C> & E;

  export type AnyProps =
    | WidgetViewProps<AnyWidgetConnection>
    | InputViewProps<AnyInputConnection>;

  export function render(props: AnyProps): ReactElement {
    return createElement(SystemView, props);
  }

  export const use = useSystemView;
  export function define<T extends AnyRpc>(
    rpc: T,
    definition: Definition<T>
  ): void {
    if (typeof definition === "function") {
      componentMap.set(rpc, definition);
      return;
    }
    if (Array.isArray(definition)) {
      if (definition.length === 1) {
        return define(rpc, definition[0]);
      }
      define(rpc, definition[0]);
      define(rpc, definition[1]);
      return;
    }
    for (const [childKey, childDefition] of entries(definition as any)) {
      define(rpc.at(childKey) as AnyRpc, childDefition!);
    }
  }
}
