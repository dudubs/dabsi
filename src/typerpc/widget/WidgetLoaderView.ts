import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { useLoader } from "@dabsi/view/react/useLoader";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

export function WidgetLoaderView<C extends AnyWidgetConnection>({
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

  const element = useLoader(() => connection.getElement(), [connection]);

  if (element && children) {
    return children({
      element,
      elementState: undefined,
      onElementStateChange: undefined,
      connection,
    });
  }
  return EmptyFragment;
}
