/*

    MaxLengthError = Lang`MAX_ERROR_MUST_BE_LEAST_{"minLength"}`;

    LangTemplate
    LangProvider
    LangConsumer

    MaxLengthError({minLength});

    HebrewLang = Lang(
        MaxLengthError`${....}`,
        AX``
    )
 */


import {LangMapItem} from "./LangMap";
import {LangTemplate} from "./LangTemplate";


export type LangMapValue = string | ((props) => string);

export function LangMap(
    ...args: (Record<string, LangMapValue> | Array<LangMapItem>)[]
) {
    const items = {};
    for (let arg of args) {
        if (Array.isArray(arg)) {
            for (let [key, value] of arg) {
                items[key] = value;
            }
        } else {
            Object.assign(items, arg);
        }
    }
    return items;
}

export type Lang = {
    <K extends string>(strings: TemplateStringsArray,
                       ...keys: K[]): LangTemplate<K>;


    // <MaxLangError maxLength="..."/>

    prefix?: string;


};

export const Lang: Lang = function (arg0, ...args) {

    if ((typeof arg0 === "object") && ('raw' in arg0)) {
        return LangTemplate(arg0.raw, args);
    }

    throw new Error();
};

const MaxLengthError = Lang`MAXIMUM_${"length"}_CHARACTERS`;

MaxLengthError({length: 4});
