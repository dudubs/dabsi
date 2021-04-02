import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";
import { getJasmineSpecReporterResult } from "@dabsi/jasmine/getJasmineSpecReporterResult";

export function logBeforeEach(
  propertyName: "description" | "fullName" = "fullName"
) {
  const anchor = CallStackAnchor.capture(logBeforeEach);
  let isFirst = true;
  beforeEach(() => {
    if (!isEnabled) {
      isEnabled = true;
      console.log("-----", getJasmineSpecReporterResult()[propertyName]);
    } else if (isFirst) {
      isFirst = false;
      console.warn(`logBeforeEach() already defined ${anchor.description}`);
    }
  });
}

let isEnabled = false;
afterEach(() => {
  isEnabled = false;
});
