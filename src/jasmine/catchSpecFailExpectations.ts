import { getJasmineSpecReporterResult } from "./getJasmineSpecReporterResult";

export function catchSpecFailExpectations() {
  const result = getJasmineSpecReporterResult();
  const length = result.failedExpectations?.length ?? 0;
  return (): jasmine.FailedExpectation[] => {
    return result.failedExpectations!.slice(length) || [];
  };
}
