import getTemplateToken from "@dabsi/view/lang/getTemplateToken";
import LangTemplate from "@dabsi/view/lang/LangTemplate";
import LangToken from "@dabsi/view/lang/LangToken";
import { createElement, ReactElement, ReactNode } from "react";

export interface LangTemplate<P extends string> {
  (props: Record<P, ReactNode>): ReactElement;
}

export interface LangFactory {
  (strings: TemplateStringsArray): ReactElement;

  <P extends string>(
    strings: TemplateStringsArray,
    ...params: P[]
  ): LangTemplate<P>;
}

export default <LangFactory>(
  (<any>function (strings: TemplateStringsArray, ...params) {
    if (!params.length) {
      return createElement(LangToken, null, strings[0]!);
    }

    const token = getTemplateToken(strings.raw, params);

    return props =>
      createElement(LangTemplate, {
        token,
        strings: strings.raw as string[],
        params,
        props,
      });
  })
);
