import { touchSet } from "@dabsi/common/map/touchSet";
import { entries } from "@dabsi/common/object/entries";
import { keys } from "@dabsi/common/object/keys";
import { touchObject } from "@dabsi/common/object/touchObject";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";
import { AbstractWidgetView } from "@dabsi/typerpc/widget/AbstractWidgetView";
import {
  AnyWidget,
  AnyWidgetConnection,
  isWidget,
} from "@dabsi/typerpc/widget/Widget";
import { MapView } from "@dabsi/typerpc/widget/widget-map/WidgetMapView";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import {
  createContext,
  createElement,
  ReactElement,
  useContext,
  useMemo,
} from "react";

const WidgetNamespaceViewContext = createContext([] as WidgetNamespaceView[]);

export function useWidgetNamespaceConnection<T extends AnyRpc>(
  rpc: T
): RpcConnection<T> | undefined {
  const context = useContext(WidgetNamespaceViewContext);
  return useMemo(() => {
    for (const view of context) {
      const child = view.connection.ns.getChild(rpc);
      if (child) {
        return child;
      }
    }
  }, [context, rpc]);
}

export function useWidgetNamespaceViewProps<T extends AnyWidget>(
  widget: T
): WidgetViewProps<RpcConnection<T>> | undefined {
  const context = useContext(WidgetNamespaceViewContext);
  const [view, childKey] = useMemo(() => {
    for (const view of context) {
      const childKey = view.connection.ns.rpc.getChildKey(widget);
      if (childKey) {
        return [view, childKey];
      }
    }
  }, [context, widget]) || [null, null];
  return view?.getChildProps(childKey!);
}

function Provider({ value, children }) {
  const context = useContext(WidgetNamespaceViewContext);
  return createElement(WidgetNamespaceViewContext.Provider, {
    value: [value, ...context],
    children,
  });
}
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

    for (const [childKey, child] of entries(childMap)) {
      if (!isWidget(child)) continue;
      if (childKey in elementMap) {
        childKeys.add(childKey);
      } else if (touchSet(this._warnings, childKey)) {
        console.warn(`No element for childKey '${childKey}'.`);
      }
    }

    for (const childKey of keys(elementMap)) {
      if (!touchSet(this._warnings, childKey)) continue;
      if (!childKeys.has(childKey)) {
        console.warn(`No child for childKey '${childKey}', You did 'ts make'?`);
      }
    }
  }

  getChildKeys(): Iterable<string> {
    return this._childKeys;
  }

  renderView() {
    return createElement(Provider, {
      value: this,
      children: this.props.children(this),
    });
  }
}

/*

    children={
        render(xx, ()=>{})

    }

*/
