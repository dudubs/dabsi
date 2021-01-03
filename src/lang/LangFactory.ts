import LangComponent from "./LangComponent";
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
      return createElement(LangComponent, {
        token: strings[0]!,
      });
    } else {
      return props => {
        return createElement(LangComponent, {
          template: {
            strings: strings.raw as string[],
            params,
            props,
          },
        });
      };
    }
  })
);
