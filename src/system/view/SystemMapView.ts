import { Override } from "@dabsi/common/typings2/Override";
import { Renderer } from "@dabsi/react/renderer";
import { RendererOrProps } from "@dabsi/react/RendererOrProps";
import { SystemView, SystemViewContext } from "@dabsi/system/view/SystemView";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { TWidget, Widget } from "@dabsi/typerpc/widget/Widget";
import { AnyWidgetRecord } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { MapView } from "@dabsi/typerpc/widget/widget-map/WidgetMapView";
import { WidgetNamespaceView } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamespaceView";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { InputMapView } from "@dabsi/typerpc/input/input-map/InputMapView";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { WidgetMapView } from "@dabsi/typerpc/widget/widget-map/WidgetMapView";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export type AnyMapViewComponent = ComponentType<{
  children: Renderer<MapView<WidgetViewProps<any>>>;
}>;

export type AnySystemMapConnection =
  | AnyWidgetConnectionWithWidgetMap
  | RpcConnection<WidgetNamespace>;

type SystemMapChildKey<
  C extends AnySystemMapConnection
> = C extends AnyWidgetConnectionWithWidgetMap
  ? string & keyof C["map"]
  : string;

export type SystemMapViewProps<
  C extends AnySystemMapConnection,
  ItemOptions extends object
> = {
  for: WidgetViewProps<C>;
  first?: SystemMapChildKey<C>[];
  last?: SystemMapChildKey<C>[];
  between?: ReactNode;
  children?: Record<string, RendererOrProps<WidgetViewProps<any>, ItemOptions>>;
};

const mapViewComponentSymbol = Symbol("mapView");

InputMap[mapViewComponentSymbol] = InputMapView;
WidgetMap[mapViewComponentSymbol] = WidgetMapView;
WidgetNamespace[mapViewComponentSymbol] = WidgetNamespaceView;

export type AnyWidgetConnectionWithWidgetMap = RpcConnection<
  Widget<
    Override<
      TWidget,
      {
        Controller: {
          map: RpcMap<AnyWidgetRecord>;
        };
      }
    >
  >
>;

function getOrdredKeys({ firstKeys, lastKeys, keys }) {
  const orderedKeys = new Set<string>();
  firstKeys?.forEach(key => orderedKeys.add(key));
  keys.forEach(key => orderedKeys.add(key));
  lastKeys?.forEach(key => {
    orderedKeys.delete(key);
    orderedKeys.add(key);
  });
  return [...orderedKeys];
}

export function SystemMapView<
  C extends AnySystemMapConnection,
  ItemOptions extends object
>({
  children,
  for: viewMapProps,
  last: lastKeys,
  first: firstKeys,
  renderItem,
  between,
}: SystemMapViewProps<C, ItemOptions> & {
  renderItem?(
    element: ReactElement,
    options: ItemOptions,
    _: {
      index: number;
      key: string;
      isLast: boolean;
    }
  );
}) {
  const { connection } = viewMapProps;

  const mapViewComponent: AnyMapViewComponent =
    connection.$widget.rpcType[mapViewComponentSymbol];

  const orderedKeysRef = useRef(null as string[] | null);

  return createElement(mapViewComponent, {
    ...viewMapProps,
    children: view => {
      const orderedKeys =
        orderedKeysRef.current ||
        (orderedKeysRef.current = getOrdredKeys({
          firstKeys,
          lastKeys,
          keys: [...view.getChildKeys()],
        }));

      return createElement(
        Fragment,
        null,
        orderedKeys.map((key, index) => {
          const isLast = orderedKeys.length === index + 1;
          const [render, options] = RendererOrProps(children?.[key], props =>
            createElement(SystemView, props)
          );
          let element = render(view.getChildProps(key));
          if (renderItem) {
            element = renderItem(element, options! || {}, {
              key,
              isLast,
              index,
            });
          }
          return createElement(Fragment, { key }, element);
        })
      );
    },
  });
}
