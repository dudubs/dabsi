import {Grid} from "@material-ui/core";
import React from "react";
import {MUITheme, MUIThemeProvider} from "../theme/MUITheme";

export function MUIFormActions({children}) {
    return <Grid item>
        <MUIThemeProvider<MUITheme> theme={theme => ({
            ...theme,
            props: {
                ...theme.props,
                MuiButton: {
                    ...theme.props?.MuiButton,
                    variant: "contained",
                    color: "primary"
                }
            }
        })}>
            {children}
        </MUIThemeProvider>
    </Grid>
}
