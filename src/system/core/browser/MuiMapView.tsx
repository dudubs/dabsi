import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Divider, { DividerProps } from "@material-ui/core/Divider";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React, {
  ComponentType,
  createElement,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { LangKey } from "../../../lang/LangKey";
import { RendererOrOptions } from "../../../react/RendererOrOptions";
import { useStore, useStore2 } from "../../../react/useStore";
import { Store } from "../../../Store";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { SystemView } from "../common/SystemView";

export type MuiMapViewOptions = { GridProps?: GridProps; title?: ReactNode };

export type MuiMapViewProps = {
  GridProps?: GridProps;
  titleTypographyProps?: TypographyProps;
  divider?: ReactElement;
  accordion?: boolean;
  store?: Store<MuiMapViewState>;
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
    divider,
    store: { store, state } = useStore2(MuiMapViewState),
    accordion,
    ...MapViewProps
  }: P &
    MuiMapViewProps & {
      children?: Record<
        string,
        RendererOrOptions<P, MuiMapViewOptions> | undefined
      >;
    }
) {
  divider = divider && (
    <Grid item xs={12}>
      {divider}
    </Grid>
  );

  if (accordion) {
    return (
      <>
        {renderChildren(({ key, index, element, options }) => (
          <Accordion
            expanded={
              state.selectedKey === key ||
              (state.selectedKey === undefined && index === 0)
            }
            key={key}
            onChange={() => {
              store.toggleKey("selectedKey", key);
            }}
          >
            <AccordionSummary>
              <Typography {...titleTypographyProps}>
                <LangKey for={key}>{options?.title}</LangKey>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{element}</AccordionDetails>
          </Accordion>
        ))}
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
      options: MuiMapViewOptions | undefined;
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
              const [render, options] = RendererOrOptions(
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
