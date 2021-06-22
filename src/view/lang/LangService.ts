import fromConstantCase from "@dabsi/common/string/fromConstantCase";
import fromPropertyCase from "@dabsi/common/string/fromPropertyCase";
import joinTemplate from "@dabsi/common/string/joinTemplate";
import { matchCase } from "@dabsi/common/string/matchCase";
import toTitleCase from "@dabsi/common/string/toTitleCase";
import { inspect } from "@dabsi/logging/inspect";
import { ViewContext, ViewContextMap } from "@dabsi/view/react/ViewContext";
import React from "react";

const matchTokenCase = token => matchCase(token, fromConstantCase, toTitleCase);

const translateSymbol = Symbol("translate");

export type LangTranslator<P = any> = (
  props: P,
  langs: LangService
) => string | undefined;

export default class LangService {
  static defineTranslator<P>(
    componentType: React.ComponentType<P>,
    translator: LangTranslator<P>
  ) {
    componentType[translateSymbol] = translator;
  }

  translateToken(token: string): string {
    return matchTokenCase(token);
  }

  translateElement(element: React.ReactElement): string | undefined {
    if (element.type === React.Fragment) {
      return this.translateNode(element.props.children);
    }
    const translator = element.type[translateSymbol] as
      | undefined
      | LangTranslator;
    if (translator) {
      return translator(element.props, this);
    }
    throw new Error(`Can't translate element ${inspect(element.type)}`);
  }

  translateNode(node: React.ReactNode): string | undefined {
    switch (typeof node) {
      case "undefined":
        return undefined;

      case "string":
        return node;
      case "number":
      case "boolean":
        return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(node => this.translateNode(node)).join("") || undefined;
    }
    if ((node as any).type && (node as any).props) {
      return this.translateElement(node as any);
    }
    throw new Error(`Can't translate node ${inspect(node)}`);
  }

  translateKey(key: string): string {
    return matchCase(key, fromPropertyCase, toTitleCase);
  }

  translateTemplate(
    token: string,
    strings: string[],
    params: string[],
    props: Record<string, React.ReactNode>
  ): string {
    return joinTemplate(strings, params, (s, p) => [
      this.translateToken(s),
      p ? this.translateNode(props[p]) || `{${p}}` : "",
    ]);
  }
}
