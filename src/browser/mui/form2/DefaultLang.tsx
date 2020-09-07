import {ReactElement, ReactNode, useMemo} from "react";
import {fromPropertyCase} from "../../../common/string/fromPropertyCase";
import {matchCase, SourceCase} from "../../../common/string/matchCase";
import {toConstantCase} from "../../../common/string/toConstantCase";
import {LangPropsType} from "../../../localization/Lang";
import {LangView} from "../../../localization/LangView";
import React from "react";

export function DefaultLang(props: {
    default: string
    children: ReactNode,
    sourceCase?: SourceCase
}): ReactElement {
    return useMemo(() => {

        if (props.children != undefined) {
            return <>{props.children}</>
        }

        return <LangView type={LangPropsType.token} token={
            matchCase(props.default,
                props.sourceCase || fromPropertyCase,
                toConstantCase)
        }/>
    }, [props.children, props.default]);
}
