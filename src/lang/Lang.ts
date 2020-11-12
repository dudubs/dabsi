import {createElement, ReactElement} from "react";
import {LangTemplate, LangTemplateProps} from "./LangTemplate";
import {LangView} from "./LangView";

export type LangTokenElement = ReactElement<LangTokenProps>;

export type LangTokenProps = {
    type: LangPropsType.token,
    token: string
};

export type Lang = LangTemplate<any> | ReactElement<LangTokenProps>;

export type LangElement = ReactElement<LangProps>;

export type LangNode = number | string | LangElement | LangNode[] | undefined;

export enum LangPropsType {
    token,
    template
}

export function Lang(strings: TemplateStringsArray): ReactElement<LangTokenProps>
export function Lang<P extends string, K extends string>(
    strings: TemplateStringsArray,
    param: P,
    ...params: K[]): LangTemplate<P | K>
export function Lang(strings: TemplateStringsArray, ...params): any {
    if (strings.length === 1) {
        return createElement(LangView, {
            type: LangPropsType.token,
            token: strings[0]
        })
    }
    return LangTemplate(strings.raw, params)
}


export type LangProps = LangTemplateProps<any> | LangTokenProps;
