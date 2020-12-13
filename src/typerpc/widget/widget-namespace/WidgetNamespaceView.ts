import { MapView } from "./../widget-map/WidgetMapView";
import { ReactElement } from "react";
import { keys } from "../../../common/object/keys";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidgetConnection } from "../Widget";
import { RpcConnection } from "./../../Rpc";
import { WidgetViewProps } from "./../WidgetView";
import { WidgetNamespace } from "./WidgetNamspace";

export class WidgetNamespaceView
  extends AbstractWidgetView<
    RpcConnection<WidgetNamespace>,
    WidgetViewProps<RpcConnection<WidgetNamespace>> & {
      children: (view: WidgetNamespaceView) => ReactElement;
    }
  >
  implements MapView<WidgetViewProps<AnyWidgetConnection>> {
  getChildProps(key): WidgetViewProps<AnyWidgetConnection> {
    return {
      connection: this.connection.$widget.children.ns.connections[key],
      element: this.element.elementMap[key],
      elementState: this.elementState?.[key],
      onElementStateChange: nextState => {
        this.setElementState({
          ...this.elementState,
          [key]: nextState,
        });
      },
    };
  }

  getChildKeys(): Iterable<string> {
    return keys(this.connection.$widget.children.ns.children);
  }

  renderView() {
    return this.props.children(this);
  }
}

/*

    children={
        render(xx, ()=>{})

    }

*/
