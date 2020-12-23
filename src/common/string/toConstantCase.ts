import { TargetCase } from "@dabsi/common/string/matchCase";

export const toConstantCase: TargetCase = words =>
  [...words].join("_").toUpperCase();
