import {Theme as MUITheme} from "@material-ui/core";

export function MUIDirection(
    left = "left", right = "right") {
    return (theme: MUITheme) => theme.direction === "rtl" ? right : left;
}


