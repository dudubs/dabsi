import { Theme as MuiTheme } from "@material-ui/core";
import { ComponentType } from "react";
import styled from "styled-components";


export type CssComponentType = ComponentType<{
    className?: string | undefined
}>;


export type CssHook = <C extends CssComponentType> (component: C) => C;

export function MuiCss(strings,
    ...args: Array<string | ((theme: MuiTheme) => string)>): CssHook {
    return (component): any => styled(component)(strings, ...args.map(
        arg => ({ theme }) => typeof arg === "function" ? arg(theme) : String(arg)
    ))
}



