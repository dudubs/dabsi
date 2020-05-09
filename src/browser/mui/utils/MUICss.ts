import { Theme as MUITheme } from "@material-ui/core";
import { ComponentType } from "react";
import styled from "styled-components";


export type CssComponentType = ComponentType<{
    className?: string | undefined
}>;


export type CssHook = <C extends CssComponentType> (component: C) => C;

export function MUICss(strings,
    ...args: Array<string | ((theme: MUITheme) => string)>): CssHook {
    return (component): any => styled(component)(strings, ...args.map(
        arg => ({ theme }) => typeof arg === "function" ? arg(theme) : String(arg)
    ))
}



