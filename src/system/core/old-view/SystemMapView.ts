import { Override } from "@dabsi/common/typings2/Override";
import { Renderer } from "@dabsi/view/react/renderer";
import { ReactRendererOrProps } from "@dabsi/view/react/patterns/ReactRendererOrProps";
import { SystemView } from "@dabsi/system/core/old-view/SystemView";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { InputMapView } from "@dabsi/old-typerpc/input/input-map/InputMapView";
import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { TWidget, Widget } from "@dabsi/old-typerpc/widget/Widget";
import {
  AnyWidgetRecord,
  WidgetMap,
} from "@dabsi/old-typerpc/widget/widget-map/rpc";
import {
  MapView,
  WidgetMapView,
} from "@dabsi/old-typerpc/widget/widget-map/view";
import { WidgetViewProps } from "@dabsi/old-typerpc/widget/view/component";
import {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
import { getOrdredKeys } from "./getOrdredKeys";

const componentViewSymbol = Symbol("system-map-view");

InputMap[componentViewSymbol] = InputMapView;
WidgetMap[componentViewSymbol] = WidgetMapView;

export type AnyMapViewComponent = ComponentType<{
  children: Renderer<MapView<WidgetViewProps<any>>>;
}>;

export type AnySystemMapConnection = AnyWidgetConnectionWithWidgetMap;

export type SystemMapChildKey<
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
  exclude?: SystemMapChildKey<C>[];
  wrappers?: Record<SystemMapChildKey<C>, Renderer<ReactElement>>;
  between?: ReactNode;
  children?: Record<
    string,
    ReactRendererOrProps<WidgetViewProps<any>, ItemOptions>
  >;
};

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

export function SystemMapView<
  C extends AnySystemMapConnection,
  ItemOptions extends object
>({
  children,
  for: viewMapProps,
  last: lastKeys,
  exclude: excludeKeys,
  first: firstKeys,
  wrappers: wrapperMap,
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
    connection.$widget.rpcType[componentViewSymbol];

  const orderedKeysRef = useRef(null as string[] | null);

  return createElement(mapViewComponent, {
    ...viewMapProps,
    children: view => {
      const orderedKeys =
        orderedKeysRef.current ||
        (orderedKeysRef.current = getOrdredKeys({
          firstKeys,
          lastKeys,
          keys: new Set(view.getChildKeys()),
          excludeKeys,
        }));

      return createElement(
        Fragment,
        null,
        orderedKeys.map((key, index) => {
          const isLast = orderedKeys.length === index + 1;
          const [render, options] = ReactRendererOrProps(
            children?.[key],
            props => SystemView.render(props)
          );
          let element = render(view.getChildProps(key));
          if (renderItem) {
            element = renderItem(element, options! || {}, {
              key,
              isLast,
              index,
            });
          }

          if (wrapperMap?.[key]) {
            element = wrapperMap[key](element);
          }
          return createElement(Fragment, { key }, element);
        })
      );
    },
  });
}
