import notNull from "@dabsi/common/object/notNull";

export let currentJasmineSpecReporterResult: jasmine.CustomReporterResult | null = null;

export function getJasmineSpecReporterResult(): jasmine.CustomReporterResult {
  return notNull(currentJasmineSpecReporterResult);
}

jasmine.getEnv().addReporter({
  specStarted(result: jasmine.CustomReporterResult) {
    currentJasmineSpecReporterResult = result;
  },
  specDone(result: jasmine.CustomReporterResult) {
    currentJasmineSpecReporterResult = null;
  },
});
