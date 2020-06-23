import {Grid} from "@material-ui/core";
import React from "react";
import {MuiTheme, MuiThemeProvider} from "../theme/MuiTheme";

export function MuiFormActions({children}) {
    return <Grid item>
        <MuiThemeProvider<MuiTheme> theme={theme => ({
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
        </MuiThemeProvider>
    </Grid>
}
