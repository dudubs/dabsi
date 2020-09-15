import {createElement, ReactElement} from "react";
import {definedAt} from "../common/object/definedAt";
import {joinTemplate} from "../common/string/joinTemplate";
import {LangElement, LangNode, LangPropsType, LangTokenElement} from "./Lang";
import {LangView} from "./LangView";

export type LangTemplate<K extends string> = {

    token: string;

    // formatter
    (props: Record<K, LangNode>): LangTemplateElement<K>;

    // provider
    (strings: TemplateStringsArray, ...keys: K[]):
        LangTemplateEntry<K>;

}

export type LangTemplateFormatter<K extends string> = (props: Record<K, any>) => string;

export type LangTemplateEntry<K extends string> = [string, LangTemplateFormatter<K>];

export type LangTemplateProps<K extends string> = {
    type: LangPropsType.template,
    token: string;
    props: Record<K, LangTemplateElement<any> | LangTokenElement | string | number>;
    params: K[],
    strings: ReadonlyArray<string>;
};


export type LangTemplateElement<K extends string> = ReactElement<LangTemplateProps<K>>;


export function LangTemplate<K extends string>(strings: ReadonlyArray<string>, params: K[]):
    LangTemplate<K> {
    const token = joinTemplate(strings, params, param => `{${param}}`);

    template.token = token;
    return <any>template;

    function template(arg0, ...args) {
        if ((args.length === 0) && (typeof arg0 === "object")) {
            return createElement(LangView, {
                type: LangPropsType.template,
                token,
                props: arg0,
                params,
                strings
            })
        } else {
            // template`...`
            return [token, props =>
                joinTemplate(<string[]>arg0, args, arg => {
                    return definedAt(props, arg);
                })
            ]
        }
    }

}
