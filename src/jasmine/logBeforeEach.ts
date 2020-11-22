import { CodeStackInfo } from "../typedi/CodeStackInfo";
import { getJasmineSpecReporterResult } from "./getJasmineSpecReporterResult";

export function logBeforeEach(
  propertyName: "description" | "fullName" = "fullName"
) {
  const codeStackInfo = new CodeStackInfo(new Error());
  let isFirst = true;
  beforeEach(() => {
    if (!isEnabled) {
      isEnabled = true;
      console.log("-----", getJasmineSpecReporterResult()[propertyName]);
    } else if (isFirst) {
      isFirst = false;
      console.warn(
        `logBeforeEach() already defined ${codeStackInfo.description}`
      );
    }
  });
}

let isEnabled = false;
afterEach(() => {
  isEnabled = false;
});
