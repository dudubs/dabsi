import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/view/component";
import { useLoader } from "@dabsi/view/react/useLoader";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

export function WidgetViewLoader<C extends AnyWidgetConnection>({
  connection: connectionOrGetConnection,
  deps = [],
  children,
}: {
  connection: C | (() => C);
  deps?: any[];
  children?(props: WidgetViewProps<C>): React.ReactElement;
}): React.ReactElement {
  const connection: C = React.useMemo(() => {
    if (typeof connectionOrGetConnection === "function")
      return connectionOrGetConnection();
    return connectionOrGetConnection;
  }, deps);

  const props = WidgetViewLoader.use(connection);

  return props && children ? children(props) : EmptyFragment;
}

WidgetViewLoader.use = function <C extends AnyWidgetConnection>(
  connection: C,
  { deps = [] }: { deps?: any[] } = {}
): null | WidgetViewProps<C> {
  const element = useLoader(() => connection.getElement(), [
    connection,
    ...deps,
  ]);

  return element
    ? {
        connection,
        element,
        elementState: undefined,
        onElementStateChange: undefined,
      }
    : null;
};
