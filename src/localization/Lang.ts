import {createElement, ReactElement} from "react";
import {definedAt} from "../common/object/defined";
import {LangTemplate, LangTemplateProps} from "./LangTemplate";
import {LangView} from "./LangView";

export type LangTokenElement = ReactElement<LangTokenProps>;

export type LangTokenProps = {
    type: LangPropsType.token,
    token: string, section?: string
};

export type Lang = LangTemplate<any> | ReactElement<LangTokenProps>;

export type LangElement = ReactElement<LangProps>;

export type LangNode = string | LangElement | LangNode[];

export type LangFactory = {

    <K extends string>(strings: TemplateStringsArray):
        ReactElement<LangTokenProps>;


    <K extends string, P extends string>(strings: TemplateStringsArray,
                                         p: P,
                                         ...keys: K[]):
        LangTemplate<P | K>;

}
export type LangNamespace = LangFactory & {

    (section: string): LangFactory;


};

export enum LangPropsType {
    token,
    template
}

export const Lang: LangNamespace = function (arg0, ...args): any {
    if (typeof arg0 === "string") {
        const section = arg0;
        return (arg0, ...args) => {
            if (arg0.length === 1) {
                return createElement(LangView, {
                    type: LangPropsType.token,
                    token: arg0[0]
                })
            }

            return LangTemplate(arg0, args, section);
        };
    }

    if (arg0.length === 1) {
        return createElement(LangView, {
            type: LangPropsType.token,
            token: arg0[0]
        })
    }

    return LangTemplate(definedAt(arg0, 'raw'), args);
};


export type LangProps = LangTemplateProps<any> | LangTokenProps;
