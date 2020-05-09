import {StylesProvider as MUIStylesProvider } from "@material-ui/styles";
import React from "react";
import {MUIJss} from "./MUIJss";

import {ThemeProvider as StyledThemProvider} from "styled-components";
import {MUIDefaultTheme, MUIThemeProvider} from "../theme/MUITheme";

export function MUIApp({children}) {
    return <MUIStylesProvider jss={MUIJss}>
        <StyledThemProvider theme={MUIDefaultTheme}>
            <MUIThemeProvider theme={MUIDefaultTheme}>
                {children}
            </MUIThemeProvider>
        </StyledThemProvider>
    </MUIStylesProvider>
}
