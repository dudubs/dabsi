import {
  AnyWidgetConnection,
  WidgetElement,
} from "@dabsi/old-typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/old-typerpc/widget/view/component";
import { useLoader } from "@dabsi/view/react/useLoader";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

export function WidgetViewLoader<C extends AnyWidgetConnection>({
  connection: connectionOrGetConnection,
  deps = [],
  children,
  onLoad,
}: {
  connection: C | (() => C);
  deps?: any[];
  children?(props: WidgetViewProps<C>): React.ReactElement;
  onLoad?: (element: WidgetElement<C>) => void;
}): React.ReactElement {
  const connection: C = React.useMemo(() => {
    if (typeof connectionOrGetConnection === "function")
      return connectionOrGetConnection();
    return connectionOrGetConnection;
  }, deps);

  const props = WidgetViewLoader.use(connection, { onLoad });

  return props && children ? children(props) : EmptyFragment;
}

WidgetViewLoader.use = function <C extends AnyWidgetConnection>(
  connection: C,
  {
    deps = [],
    onLoad,
  }: { deps?: any[]; onLoad?(element: WidgetElement<C>): void } = {}
): null | WidgetViewProps<C> {
  const element = useLoader(
    () => connection.getElement(),
    [connection, ...deps],
    onLoad
  );

  return element
    ? {
        connection,
        element,
        elementState: undefined,
        onElementStateChange: undefined,
      }
    : null;
};
