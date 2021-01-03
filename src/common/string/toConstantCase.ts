import { TargetCase } from "./matchCase";

export const toConstantCase: TargetCase = words =>
  [...words].join("_").toUpperCase();
