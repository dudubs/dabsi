import LangFactory from "./LangFactory";
export * from "@dabsi/view/lang/LangFactory";

declare global {
  let lang: typeof LangFactory;
}

Object.assign(global, { lang: LangFactory });

export default LangFactory;
