import { getJasmineSpecReporterResult } from "./getJasmineSpecReporterResult";

export function testCase<T>(msg: string, callback: () => void): void {
  const result = getJasmineSpecReporterResult();
  const length = result.failedExpectations?.length ?? 0;
  try {
    return callback();
  } finally {
    if (result.failedExpectations?.[length]) {
      result.failedExpectations[length].message = `In test case: ${msg}`;
      result.failedExpectations.length = length + 1;
    }
  }
}
