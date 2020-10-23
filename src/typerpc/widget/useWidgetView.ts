import { useEffect, useState } from "react";
import { AnyWidgetConnection } from "./Widget";
import { WidgetViewProps } from "./WidgetView";

export function useWidgetView<C extends AnyWidgetConnection>(
  props: WidgetViewProps<C>
) {
  const [element, setElement] = useState(props.element);

  useEffect(() => {
    if (element !== props.element) {
      setElement(props.element);
    }
  }, [props.element]);

  return { element, setElement };
}
