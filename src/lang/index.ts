import LangFactory from "@dabsi/lang/LangFactory";
export * from "./LangFactory";

declare global {
  let lang: typeof LangFactory;
}

Object.assign(global, { lang: LangFactory });

export default LangFactory;
