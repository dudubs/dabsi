import { Fn } from "@dabsi/common/typings2/Fn";
import { waitFor } from "./waitFor";

export function waitForSpyCall(
  spy: jasmine.Spy,
  callback: (callInfo: jasmine.CallInfo<Fn>) => any = () => true,
  ms?: number
): Promise<jasmine.CallInfo<Fn>> {
  return waitFor(() => {
    const ci = spy.calls.all().find(callback);
    spy.calls.reset();
    return ci;
  }, ms);
}
