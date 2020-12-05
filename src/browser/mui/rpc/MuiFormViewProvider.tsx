import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { ReactElement } from "react";
import { InputMapThemeProvider } from "../../../typerpc/input/input-map/InputMapView";
import { MuiThemeProvider } from "../MuiSystem";
import { MuiFormViewTheme } from "./MuiFormViewTheme";

export function MuiFormViewProvider({ children }): ReactElement {
  return (
    <InputMapThemeProvider
      theme={theme => ({
        ...theme,
        renderContainer: element => (
          <Grid container spacing={2}>
            {element}
          </Grid>
        ),
        renderField(element, key) {
          if (element.type === Grid && element.props.item) {
            return element;
          }
          return (
            <Grid item xs={12} key={key}>
              {element}
            </Grid>
          );
        },
      })}
    >
      <MuiThemeProvider theme={MuiFormViewTheme}>{children}</MuiThemeProvider>
    </InputMapThemeProvider>
  );
}
