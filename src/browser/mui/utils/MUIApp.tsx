import {StylesProvider as MuiJssProvider} from "@material-ui/styles";
import * as React from "react"; import {ReactNode} from "react";
import {MuiJss} from "./MuiJss";

import {ThemeProvider as StyledThemeProvider} from "styled-components";
import {MuiDefaultTheme, MuiStylesThemeProvider, MuiTheme, MuiThemeProvider} from "../theme/MuiTheme";

export function MuiAppThemeProvider({children, theme}: {
    theme: MuiTheme,
    children?: ReactNode
}) {
    return <StyledThemeProvider theme={theme}>
        <MuiStylesThemeProvider theme={theme}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </MuiStylesThemeProvider>
    </StyledThemeProvider>
}

export function MuiApp({children}) {
    return <MuiJssProvider jss={MuiJss}>
        <MuiAppThemeProvider theme={MuiDefaultTheme}>
            {children}
        </MuiAppThemeProvider>
    </MuiJssProvider>
}
