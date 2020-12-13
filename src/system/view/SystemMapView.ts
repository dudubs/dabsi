import {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
import { Override } from "../../common/typings2/Override";
import { RendererOrProps } from "../../react/RendererOrProps";
import { RpcConnection } from "../../typerpc/Rpc";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { TWidget, Widget } from "../../typerpc/widget/Widget";
import { AnyWidgetRecord } from "../../typerpc/widget/widget-map/WidgetMap";
import { WidgetNamespace } from "../../typerpc/widget/widget-namespace/WidgetNamspace";
import { WidgetViewProps } from "../../typerpc/widget/WidgetView";
import { Renderer } from "./../../react/renderer";
import { MapView } from "./../../typerpc/widget/widget-map/WidgetMapView";
import { SystemView } from "./SystemView";

export type AnyMapViewComponent = ComponentType<{
  children: Renderer<MapView<WidgetViewProps<any>>>;
}>;

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

export type AnySystemMapConnection =
  | AnyWidgetConnectionWithWidgetMap
  | RpcConnection<WidgetNamespace>;

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
  C extends AnyWidgetConnectionWithWidgetMap,
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
            SystemView(props)
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

export namespace SystemMapView {
  export function register(
    mapWidget,
    mapViewComponent: AnyMapViewComponent,
    defaultMapViewComponent
  ) {
    mapWidget[mapViewComponentSymbol] = mapViewComponent;

    SystemView.register(mapWidget, props =>
      createElement(defaultMapViewComponent, { for: props })
    );
  }
}
