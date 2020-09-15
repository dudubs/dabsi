import {createMuiTheme, Theme as MuiTheme, ThemeProvider as MuiThemeProvider} from "@material-ui/core";
import {heIL} from "@material-ui/core/locale";
import {ThemeProvider as MuiStylesThemeProvider} from "@material-ui/styles";

export {
    MuiThemeProvider, MuiTheme,
    MuiStylesThemeProvider
};


declare module "@material-ui/styles" {
    interface DefaultTheme extends MuiTheme {

    }
}


declare module "styled-components" {
    interface DefaultTheme extends MuiTheme {

    }
}
export const MuiDefaultTheme = createMuiTheme({
    direction: "rtl",
    props:{
        MuiTextField: {
            fullWidth:true
        }
    }
}, heIL);

