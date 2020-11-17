import {
  createMuiTheme,
  Theme as MuiCoreTheme,
  ThemeProvider as MuiCoreThemeProvider,
} from "@material-ui/core/styles";
import {
  jssPreset,
  StylesProvider as MuiJssProvider,
} from "@material-ui/core/styles";
import { create } from "jss";
import { createElement, useMemo } from "react";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  LangTranslator,
  LangTranslatorContext,
} from "../../lang/LangTranslator";

declare module "@material-ui/core/styles" {
  interface DefaultTheme extends MuiCoreTheme {}
}
declare module "styled-components" {
  interface DefaultTheme extends MuiCoreTheme {}
}

export function createMuiSystem({
  jssPlugins = [],
  theme = createMuiTheme({
    props: {
      MuiTextField: {
        fullWidth: true,
      },
      MuiDialog: {
        fullWidth: true,
      },
    },
  }),
} = {}) {
  const langTranslator = new LangTranslator({});

  const jss = create({
    plugins: [...jssPreset().plugins, ...jssPlugins],
  });
  return {
    Provider({ children }) {
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

      children = createElement(LangTranslatorContext.Provider, {
        children,
        value: langTranslator,
      });

      return children;
    },
  };
}
