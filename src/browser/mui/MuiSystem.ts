import {
  createMuiTheme,
  jssPreset,
  StylesProvider as MuiJssProvider,
  Theme as MuiTheme,
  ThemeProvider as MuiCoreThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import { createElement, ReactElement } from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";

export { MuiTheme };

declare module "@material-ui/core/styles" {
  interface DefaultTheme extends MuiTheme {}
}
declare module "styled-components" {
  interface DefaultTheme extends MuiTheme {}
}
const jss = create({
  plugins: [...jssPreset().plugins],
});

const theme = createMuiTheme();

export function MuiSystem({ children }: { children: ReactElement }) {
  children = createElement(MuiCoreThemeProvider, {
    children,
    theme,
  });

  children = createElement(StyledThemeProvider, {
    children,
    theme,
  });

  children = createElement(MuiJssProvider, {
    children,
    jss,
  });
  return children;
}
