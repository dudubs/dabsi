import {createElement, Fragment, useContext} from "react";
import {LangProps} from "./Lang";
import {LangTranslatorContext} from "./LangTranslator";

export function LangView(props: LangProps) {
    const translator = useContext(LangTranslatorContext);
    return createElement(Fragment, null,
        translator.translateProps(props))
}
