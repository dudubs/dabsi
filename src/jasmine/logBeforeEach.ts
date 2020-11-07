import { getStackLastLine } from "../typedi/GetStackLastLine";
import { getJasmineSpecReporterResult } from "./getJasmineSpecReporterResult";

export function logBeforeEach(
  propertyName: "description" | "fullName" = "fullName"
) {
  const stackLastLine = getStackLastLine();
  let isFirst = true;
  beforeEach(() => {
    if (!isEnabled) {
      isEnabled = true;
      console.log("-----", getJasmineSpecReporterResult()[propertyName]);
    } else if (isFirst) {
      isFirst = false;
      console.warn(
        `logBeforeEach() already defined ${stackLastLine().description}`
      );
    }
  });
}

let isEnabled = false;
afterEach(() => {
  isEnabled = false;
});
