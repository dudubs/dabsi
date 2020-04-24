import React, {createElement, Fragment, ReactElement} from "react";
import {useArrayToObject} from "../common/array/useArrayToObject";
import {definedAt} from "../common/object/defined";
import {joinTemplate} from "../common/string/joinTemplate";
import {useContextOrType, useDefinedContext} from "../react/utils/hooks/useDefinedContext";
import {LangService} from "./LangService";

export type LangTemplate<K extends string> = {

    token: string;

    (props: Record<K, string | number>): LangTemplateElement<K>;

    (strings: TemplateStringsArray, ...keys: K[]):
        LangTemplateEntry<K>;

}

export type LangTemplateFormatter<K extends string> = (props: Record<K, any>) => string;

export type LangTemplateEntry<K extends string> = [string, LangTemplateFormatter<K>];


export type LangTemplateProps<K extends string> = {
    token: string;
    props: Record<K, string | number>;
};

export type LangTemplateElement<K extends string> = ReactElement<LangTemplateProps<K>>;




export function LangTemplate<K extends string>(strings: ReadonlyArray<string>,
                                               params: K[]):
    LangTemplate<K> {

    const token = joinTemplate(strings, params, param => `{${param}}`);

    template.token = token;

    return <any>template;

    function template(arg0, ...args) {
        if ((args.length === 0) && (typeof arg0 === "object")) {
            return createElement(LangTemplateText, {
                token,
                props: arg0
            })
        } else {
            // template`...`
            return [token, props =>
                joinTemplate(<string[]>arg0, args, arg =>
                    definedAt(props, arg))]
        }
    }

}

export function LangTemplateText<K extends string>(
    {props, token}: LangTemplateProps<K>
) {
    const service = useContextOrType(LangService);
    return createElement(Fragment,
        null,
        service?.translate(token, props) ?? token
    )
}
