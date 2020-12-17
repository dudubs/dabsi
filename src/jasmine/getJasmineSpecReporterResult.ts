import { defined } from "@dabsi/common/object/defined";

export let currentJasmineSpecReporterResult: jasmine.CustomReporterResult | null = null;

export function getJasmineSpecReporterResult(): jasmine.CustomReporterResult {
  return defined(currentJasmineSpecReporterResult);
}

jasmine.getEnv().addReporter({
  specStarted(result: jasmine.CustomReporterResult) {
    currentJasmineSpecReporterResult = result;
  },
  specDone(result: jasmine.CustomReporterResult) {
    currentJasmineSpecReporterResult = null;
  },
});
