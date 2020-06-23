import {Theme as MuiTheme} from "@material-ui/core";

export function MuiDirection(
    left = "left", right = "right") {
    return (theme: MuiTheme) => theme.direction === "rtl" ? right : left;
}


