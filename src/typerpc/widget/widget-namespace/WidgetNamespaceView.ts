import { touchObject } from "@dabsi/common/object/touchObject";
import { touchSet } from "@dabsi/common/map/touchSet";
import { WeakId } from "@dabsi/common/WeakId";
import { MapView } from "@dabsi/typerpc/widget/widget-map/WidgetMapView";
import { ReactElement } from "react";
import { keys } from "@dabsi/common/object/keys";
import { AbstractWidgetView } from "@dabsi/typerpc/widget/AbstractWidgetView";
import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { chain } from "@dabsi/common/object/chain";

export class WidgetNamespaceView
  extends AbstractWidgetView<
    RpcConnection<WidgetNamespace>,
    WidgetViewProps<RpcConnection<WidgetNamespace>> & {
      children: (view: WidgetNamespaceView) => ReactElement;
    }
  >
  implements MapView<WidgetViewProps<AnyWidgetConnection>> {
  connectionMap = {};

  getChildProps(key): WidgetViewProps<AnyWidgetConnection> {
    return {
      connection: touchObject(this.connectionMap, key, () => {
        return this.connection.$widget.children.ns.children[
          key
        ].createRpcConnection(
          [...this.connection.$path, "ns", key],
          this.connection.$command
        );
      }),
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

  _childKeys;

  _warnings = new Set();

  updateElement() {
    const childMap = this.connection.$widget.children.ns.children;
    const elementMap = this.element.elementMap;
    const childKeys = (this._childKeys = new Set());
    for (const childKey of keys(childMap)) {
      if (childKey in elementMap) {
        childKeys.add(childKey);
      } else if (touchSet(this._warnings, childKey)) {
        console.warn(`No element for childKey '${childKey}'.`);
      }
    }
    for (const childKey of keys(elementMap)) {
      if (touchSet(this._warnings, childKey) && !childKeys.has(childKey)) {
        console.warn(`No child for childKey '${childKey}'.`);
      }
    }
  }

  getChildKeys(): Iterable<string> {
    return this._childKeys;
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
