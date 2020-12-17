import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";
import { getJasmineSpecReporterResult } from "@dabsi/jasmine/getJasmineSpecReporterResult";

export function logBeforeEach(
  propertyName: "description" | "fullName" = "fullName"
) {
  const codeStackInfo = new CallStackInfo(new Error());
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
