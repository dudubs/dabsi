import LangService, { LangTranslator } from "@dabsi/view/lang/LangService";
import useLangService from "@dabsi/view/lang/useLangService";
import createFragment from "@dabsi/view/react/createFragment";
import React from "react";

export default function createLangComponent<P>(
  displayName: string,
  translator: LangTranslator<P>
): React.FunctionComponent<P> {
  const component: React.FunctionComponent<P> = props =>
    createFragment(translator(props, useLangService()));

  component.displayName = displayName;

  LangService.defineTranslator(component, translator);
  return component;
}
