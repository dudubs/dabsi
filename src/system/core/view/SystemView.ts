import { entries } from "@dabsi/common/object/entries";
import { objectBases } from "@dabsi/common/object/objectBases";
import { useSystemView } from "@dabsi/system/core/view/use";
import { AnyInput, AnyInputConnection } from "@dabsi/old-typerpc/input/Input";
import { InputViewProps } from "@dabsi/old-typerpc/input/InputView";
import {
  AnyRpc,
  RpcChild,
  RpcChildren,
  RpcConnection,
} from "@dabsi/old-typerpc/Rpc";
import { WidgetViewProps } from "@dabsi/old-typerpc/widget/view/component";
import {
  AnyWidget,
  AnyWidgetConnection,
} from "@dabsi/old-typerpc/widget/Widget";
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

  let component = defaultByType
    ? null
    : componentMap.get(props.connection.$widget);
  for (const rpcType of objectBases(props.connection.$widget.rpcType)) {
    if (component) break;
    if (typeof rpcType !== "function") break;
    component = componentMap.get(rpcType);
  }

  if (!component)
    return createElement(
      Fragment,
      null,
      `No system-view for ${props.connection.$path.join("/")}, ${
        props.connection.$widget.rpcType?.name
      }`
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
