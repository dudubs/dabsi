import toReactElement from "@dabsi/view/react/utils/toReactElement";
import {
  createMuiTheme,
  jssPreset,
  StylesProvider as MuiJssProvider,
  Theme as MuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import { createElement, ReactNode } from "react";
import { ThemeProvider as JssThemeProvider } from "styled-components";

export { MuiTheme, MuiThemeProvider };

declare global {
  namespace MuiSystem {
    interface Theme {}
  }
}

declare module "@material-ui/core/styles/props" {
  interface ComponentsPropsList extends MuiSystem.Theme {}
}

declare module "@material-ui/core/styles" {
  interface DefaultTheme extends MuiTheme {}
}
declare module "styled-components" {
  interface DefaultTheme extends MuiTheme {}
}
const jss = create({
  plugins: [...jssPreset().plugins],
});

export const MuiDefaultTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
    },
    MuiInputLabel: {
      root: { fontSize: "13px" },
    },
    MuiOutlinedInput: {
      input: {
        padding: "15.5px 13px",
      },
    },
  },
});

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
