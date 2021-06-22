import createLangComponent from "@dabsi/view/lang/createLangComponent";
import getTemplateToken from "@dabsi/view/lang/getTemplateToken";
import React from "react";
export type LangTemplateProps = {
  token: string;
  strings: string[];
  params: string[];
  props: Record<string, React.ReactNode>;
};

export default createLangComponent(
  "LangTemplate",
  (p: LangTemplateProps, langs) =>
    langs.translateTemplate(
      getTemplateToken(p.strings, p.params),
      p.strings,
      p.params,
      p.props
    )
);
