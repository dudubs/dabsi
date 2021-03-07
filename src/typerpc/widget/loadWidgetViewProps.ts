import {
  AnyWidgetConnection,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { Store } from "@dabsi/store";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";

// TODO: Make service for WidgetViewLoader

export async function loadWidgetViewProps<C extends AnyWidgetConnection>(
  connection: C,
  store?: Store<WidgetElementState<C>>
): Promise<WidgetViewProps<C>> {
  const element = await connection.getElement(store?.state);
  return {
    connection,
    element,
    elementState: store?.state,
    onElementStateChange: state => {
      store?.set(state);
    },
  };
}
