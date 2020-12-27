import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import LangKey from "@dabsi/lang/LangKey";
import { Renderer } from "@dabsi/react/renderer";
import { RendererOrProps } from "@dabsi/react/RendererOrProps";
import { State } from "@dabsi/react/State";
import { useStore } from "@dabsi/react/useStore";
import { Store } from "@dabsi/store";
import { AnyWidgetConnection } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { SystemView } from "@dabsi/system/rpc/view/SystemView";

export type MuiMapViewChildProps = {
  GridProps?: GridProps;
  title?: ReactNode;
};

export type MuiMapChildRendererOrProps<
  P extends WidgetViewProps<AnyWidgetConnection>
> = RendererOrProps<P, MuiMapViewChildProps>;

export type AccordionMap = Record<
  string,
  { details: ReactElement; title?: ReactNode }
>;

export interface MuiMapViewLayout<K extends string, S> {
  state?: S;
  renderContainer?: Renderer<ReactElement, [{ store: Store<S> }]>;
  renderItem?: Renderer<ReactElement, [{ store: State<S> }]>;
}

export type MuiMapViewProps<K extends string = any> = {
  GridProps?: GridProps;
  titleTypographyProps?: TypographyProps;
  divider?: ReactElement;
  accordion?: boolean;
  store?: Store<MuiMapViewState>;
  disableDefaultAccordion?: boolean;

  layout?: MuiMapViewLayout<K, any>;

  startAccordion?: AccordionMap;
  endAccordion?: AccordionMap;

  order?: K[];

  extraAccordions?: {
    where?: { after: K } | { before: K } | "tail" | "head";
    title: ReactNode;
    details: ReactNode;
  }[];
};

export class MuiMapViewState /* extends State */ {
  selectedKey?: string = undefined;
}

export function MuiMapView<P extends WidgetViewProps<any>>(
  MapView: ComponentType<
    P & {
      children: (getProps: (key: string) => P) => ReactNode;
    }
  >,
  {
    children,
    GridProps,
    titleTypographyProps,
    disableDefaultAccordion,
    endAccordion,
    startAccordion,
    divider,
    layout,
    store: { store, state } = useStore(MuiMapViewState),
    accordion,
    ...MapViewProps
  }: P &
    MuiMapViewProps & {
      children?: Record<
        string,
        RendererOrProps<P, MuiMapViewChildProps> | undefined
      >;
    }
) {
  divider = divider && (
    <Grid item xs={12}>
      {divider}
    </Grid>
  );

  if (accordion) {
    let counter = 0;
    function renderAccordion({ title, details, key, selectedKey }) {
      const index = counter++;
      return (
        <Accordion
          expanded={
            state.selectedKey === selectedKey ||
            (!disableDefaultAccordion &&
              state.selectedKey === undefined &&
              index === 0)
          }
        >
          <AccordionSummary>
            <Typography {...titleTypographyProps}>
              <LangKey token={key}>{title}</LangKey>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{details}</AccordionDetails>
        </Accordion>
      );
    }

    return (
      <>
        {mapObject(startAccordion || {}, ({ title, details }, key) =>
          renderAccordion({
            title,
            details,
            selectedKey: `start:${key}`,
            key,
          })
        )}
        {renderChildren(({ key, element, options }) => {
          return renderAccordion({
            title: options?.title,
            details: element,
            selectedKey: `widget:${key}`,
            key,
          });
        })}
        {mapObject(startAccordion || {}, ({ title, details }, key) =>
          renderAccordion({
            title,
            details,
            selectedKey: `end:${key}`,
            key,
          })
        )}
      </>
    );
  }

  return (
    <Grid spacing={3} {...GridProps} container>
      {renderChildren(({ key, index, isLast, element, options }) => (
        <Fragment key={key}>
          {!!index && isLast && divider}
          <Grid item xs={12} {...options?.GridProps}>
            {element}
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );

  function renderChildren(
    wrap: (_: {
      element: ReactElement;
      options: MuiMapViewChildProps | undefined;
      index: number;
      isLast: boolean;
      key: string;
    }) => ReactElement
  ) {
    return createElement(
      MapView as ComponentType<{
        children(getProps: (key: string) => P);
      }>,
      {
        ...MapViewProps,
        children: getProps =>
          mapObjectToArray(
            MapViewProps.connection.map,
            (_, key, index, isLast) => {
              const [render, options] = RendererOrProps(
                children?.[key],
                props => SystemView(props as any)
              );
              return wrap({
                element: render(getProps(key)),
                options,
                index,
                key,
                isLast,
              });
            }
          ),
      }
    );
  }
}
