import { IndexedSeq } from "./../../immutable2";
import {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import { keys } from "../../common/object/keys";
import { mapObject } from "../../common/object/mapObject";
import { Override } from "../../common/typings2/Override";
import { RendererOrProps } from "../../react/RendererOrProps";
import { RpcConnection } from "../../typerpc/Rpc";
import { RpcMap } from "../../typerpc/rpc-map/RpcMap";
import { TWidget, Widget } from "../../typerpc/widget/Widget";
import { AnyWidgetRecord } from "../../typerpc/widget/widget-map/WidgetMap";
import { WidgetViewProps } from "../../typerpc/widget/WidgetView";
import { SystemView } from "./SystemView";

export type SystemMapViewProps<
  C extends AnyWidgetConnectionWithWidgetMap,
  ItemOptions extends object
> = {
  for: WidgetViewProps<C>;
  first?: (string & keyof C["map"])[];
  last?: (string & keyof C["map"])[];
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
  const mapViewComponent = connection.$widget.rpcType[mapViewComponentSymbol];

  const orderedKeys: string[] = useMemo(() => {
    const orderedKeys = new Set<string>();
    firstKeys?.forEach(key => orderedKeys.add(key));
    Object.keys(connection.map).forEach(key => orderedKeys.add(key));
    lastKeys?.forEach(key => {
      orderedKeys.delete(key);
      orderedKeys.add(key);
    });
    return [...orderedKeys];
  }, []);

  return createElement(
    mapViewComponent as ComponentType<{
      children(getProps: (key: string) => WidgetViewProps<any>): ReactElement;
    }>,
    {
      ...viewMapProps,
      children: getProps => {
        return createElement(
          Fragment,
          null,
          orderedKeys.map((key, index) => {
            const isLast = orderedKeys.length === index + 1;
            const [render, options] = RendererOrProps(children?.[key], props =>
              SystemView(props)
            );
            let element = render(getProps(key));
            if (renderItem) {
              element = renderItem(element, options! || {}, {
                key,
                isLast,
                index,
              });
            }
            return createElement(Fragment, { key }, element);
            if (between && index && !isLast) {
              element = createElement(Fragment, { key }, between, element);
            }
            return element;
          })
        );
      },
    }
  );
}

export namespace SystemMapView {
  export function register(
    mapWidget,
    mapViewComponent,
    defaultMapViewComponent
  ) {
    mapWidget[mapViewComponentSymbol] = mapViewComponent;

    SystemView.register(mapWidget, props =>
      createElement(defaultMapViewComponent, { for: props })
    );
  }
}
