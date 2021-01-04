import LangKey from "@dabsi/lang/LangKey";
import { useStore } from "@dabsi/react/useStore";
import { Field, Struct } from "@dabsi/struct";
import {
  AnySystemMapConnection,
  SystemMapView,
  SystemMapViewProps,
} from "@dabsi/modules/rpc/view/SystemMapView";
import {
  AccordionDetails,
  AccordionSummary,
  useTheme,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import Grid from "@material-ui/core/Grid";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ReactElement, ReactNode } from "react";

type _ThemeProps = _ItemThemeProps & {
  multiple?: boolean;
};

type _ItemThemeProps = {
  titleTypographyProps?: TypographyProps;
  descriptionTypographyProps?: TypographyProps;
};

type _ItemOptionalProps = _ItemThemeProps & {
  title?: ReactNode;
  description?: ReactNode;
};
type _ExtraItemProps = _ItemThemeProps & {
  title: ReactNode;
  description?: ReactNode;
  details: ReactElement;
};

export class MuiAccordionMapViewState extends Struct({
  firstOpen: true,
  selectedKeys: Field.set(String),
}) {}

declare global {
  namespace MuiSystem {
    interface Theme {
      MuiAccordionMapViewProps: _ItemThemeProps;
    }
  }
}

export function MuiAccordionMapView<C extends AnySystemMapConnection>(
  props: SystemMapViewProps<
    C,
    _ItemOptionalProps & {
      before?: _ExtraItemProps[];
      after?: _ExtraItemProps[];
    }
  > &
    _ThemeProps
): ReactElement {
  let counter = 0;
  const theme = useTheme().props?.MuiAccordionMapViewProps;

  const {
    titleTypographyProps: defaultTitleTypographyProps = theme?.titleTypographyProps,
    descriptionTypographyProps: defaultDescriptionTypographyProps = theme?.descriptionTypographyProps,

    multiple,

    ...SystemMapViewProps
  } = props;

  const { store, state } = useStore(MuiAccordionMapViewState);

  return (
    <SystemMapView
      {...SystemMapViewProps}
      renderItem={(
        element,
        {
          title,
          titleTypographyProps,
          description,
          descriptionTypographyProps,
          after,
          before,
        },
        { key }
      ) => {
        const beforeElement = before?.map((props, index) =>
          renderAccordition({
            ...props,
            key: "after:" + key + ":" + index,
          })
        );
        element = renderAccordition({
          key: "item:" + key,
          details: element,
          title: title || <LangKey token={key}>{title}</LangKey>,
          titleTypographyProps,
          description,
          descriptionTypographyProps,
        });
        const afterElement = after?.map((props, index) =>
          renderAccordition({
            ...props,
            key: "after:" + key + ":" + index,
          })
        );

        if (beforeElement?.length || afterElement?.length) {
          element = (
            <>
              {beforeElement}
              {element}
              {afterElement}
            </>
          );
        }

        return element;
      }}
    />
  );

  function renderAccordition({
    key,
    details,
    title,
    description = undefined as ReactNode,
    titleTypographyProps = defaultTitleTypographyProps,
    descriptionTypographyProps = defaultDescriptionTypographyProps,
  }) {
    const index = counter++;

    let summary = (
      <Typography color="textPrimary" {...titleTypographyProps}>
        {title}
      </Typography>
    );

    if (description) {
      summary = (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            {summary}
          </Grid>
          <Grid item>
            <Typography color="textSecondary" {...descriptionTypographyProps}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return (
      <Accordion
        key={key}
        expanded={
          state.selectedKeys.has(key) || (index === 0 && state.firstOpen)
        }
        onChange={() => {
          if (state.firstOpen) {
            store.disable("firstOpen");
            if (!index) {
              return;
            }
          }
          store.at("selectedKeys", ({ store, state }) => {
            if (!multiple) {
              if (state.size === 1 && state.has(key)) {
                return store.clear();
              }
              return store.toggle(key);
            }
            return store.toggle(key);
          });
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {summary}
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    );
  }
}
