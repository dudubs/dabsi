import {
  createMuiTheme,
  jssPreset,
  makeStyles,
  StylesProvider as MuiJssProvider,
  Theme as MuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import { createElement, ReactNode } from "react";

import { ThemeProvider as JssThemeProvider } from "styled-components";
import { toReactElement } from "../../react/utils/toReactElement";

export { MuiTheme, MuiThemeProvider };

declare module "@material-ui/core/styles" {
  interface DefaultTheme extends MuiTheme {}
}
declare module "styled-components" {
  interface DefaultTheme extends MuiTheme {}
}
const jss = create({
  plugins: [...jssPreset().plugins],
});

export const MuiDefaultTheme = createMuiTheme({});

export function MuiProvider({ children }: { children: ReactNode }) {
  children = createElement(MuiThemeProvider, {
    children,
    theme: MuiDefaultTheme,
  });

  children = createElement(JssThemeProvider, {
    children,
    theme: MuiDefaultTheme,
  });

  children = createElement(MuiJssProvider, {
    children,
    jss,
  });

  return toReactElement(children);
}
