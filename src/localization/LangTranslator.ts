import {createContext, useContext} from "react";
import {mapObject} from "../common/object/mapObject";
import {fromConstantCase} from "../common/string/fromConstantCase";
import {joinTemplate} from "../common/string/joinTemplate";
import {matchCase} from "../common/string/matchCase";
import {toTitleCase} from "../common/string/toTitleCase";
import {LangNode, LangProps, LangPropsType, LangTokenProps} from "./Lang";
import {LangMap} from "./LangMap";
import {LangTemplateProps} from "./LangTemplate";


export class LangTranslator {
    constructor(public map: LangMap) {
    }


    translateNode(node: LangNode) {
        switch (typeof node) {
            case "string":
            case "number":
                return String(node);
            case "undefined":
            case "boolean":
                return "";
            case "object":
                if (!node)
                    return "";
                if (Array.isArray(node)) {
                    return node.map(node => this.translateNode(node)).join('')
                }
                return this.translateProps(node.props);

        }
    }

    translateProps(props: LangProps) {
        switch (props.type) {
            case LangPropsType.template:
                return this.translateTemplate(props);
            case LangPropsType.token:
                return this.translateToken(props);
            default:
                throw new TypeError()
        }
    }

    translateDefaultToken(token: string) {
        return this.map[token] = matchCase(token, fromConstantCase, toTitleCase);
    }

    translateToken({token}: LangTokenProps): string {
        const value = this.map[token];
        switch (typeof value) {
            case "function":
                return this.map[token] = value({});
            case "string":
                return value;
            case "undefined":
                return this.translateDefaultToken(token);
            default:
                throw new TypeError(`Not support ${typeof value}`)
        }
    }

    translateTemplate(template: LangTemplateProps<any>): string {
        const value = this.map[template.token];
        switch (typeof value) {
            case "function":
                return value(mapObject(template.props, node => {
                    if (typeof node === "object") {
                        return this.translateProps(node.props);
                    }
                    return String(node);
                }));
            case "string":
                return value;
            case "undefined":
                return matchCase(
                    joinTemplate(template.strings, template.params, param => String(
                        template.props[param]
                    )),
                    fromConstantCase,
                    toTitleCase
                );
            default:
                throw new TypeError(`Can't translate ${typeof value}.`)
        }
    }
}


export const LangTranslatorContext = createContext(new LangTranslator({}));
export const useLangTranslator = () => useContext(LangTranslatorContext);

