/*

    MaxLengthError = LangNamespace`MAX_ERROR_MUST_BE_LEAST_{"minLength"}`;

    LangTemplate
    LangProvider
    LangConsumer

    MaxLengthError({minLength});

    HebrewLang = LangNamespace(
        MaxLengthError`${....}`,
        AX``
    )
 */


import {LangTemplate} from "./LangTemplate";


export type LangNamespace = {

    <K extends string>(strings: TemplateStringsArray,
                       ...keys: K[]): LangTemplate<K>;




};

export const Lang: LangNamespace = function (arg0, ...args) {


    if ('raw' in arg0) {

        return LangTemplate(arg0.raw, args);
    }

    throw new Error();
};

//

