import createLangComponent from "@dabsi/view/lang/createLangComponent";
import React from "react";
export type LangKeyProps = {
  for: string | undefined;
  children: React.ReactNode;
};

export default createLangComponent(
  "LangKey",
  (p: LangKeyProps, langs) =>
    langs.translateNode(p.children) || (p.for && langs.translateKey(p.for))
);

// <Lang translate="">
