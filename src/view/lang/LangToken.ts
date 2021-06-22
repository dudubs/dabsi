import createLangComponent from "@dabsi/view/lang/createLangComponent";
export type LangTokenProps = { children: string };

export default createLangComponent("LangToken", (p: LangTokenProps, langs) =>
  langs.translateToken(p.children)
);
