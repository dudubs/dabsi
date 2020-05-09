import {createMuiTheme, ThemeProvider as MUIThemeProvider} from "@material-ui/core";
import {heIL} from "@material-ui/core/locale";
import {Theme as MUITheme} from "@material-ui/core/styles/createMuiTheme";
import {createElement} from "react";
import {MergedObject, mergeObjectDeep} from "../../../common/object/mergeObjectDeep";

export {MUIThemeProvider, MUITheme};


export function MUIRelativeThemeProvider({theme, children}: {
    children, theme: MergedObject<MUITheme> }) {
    return createElement(MUIThemeProvider, {
        theme: prev => mergeObjectDeep<any>(prev, theme),
        children
    })
}

declare module "@material-ui/styles/defaultTheme" {
    interface DefaultTheme extends MUITheme {

    }
}
declare module "styled-components" {
    interface DefaultTheme extends MUITheme {

    }
}
export const MUIDefaultTheme = createMuiTheme({
    direction: "rtl",
    // props: {
    //     MuiTextField: {
    //         fullWidth: true
    //     }
    // }
}, heIL);
