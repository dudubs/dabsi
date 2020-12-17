import {createElement, Fragment, useContext} from "react";
import {LangProps} from "@dabsi/lang/Lang";
import {LangTranslatorContext} from "@dabsi/lang/LangTranslator";

export function LangView(props: LangProps) {
    const translator = useContext(LangTranslatorContext);
    return createElement(Fragment, null,
        translator.translateProps(props))
}

