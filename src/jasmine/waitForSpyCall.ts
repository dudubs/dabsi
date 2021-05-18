import waitFor from "@dabsi/common/async/waitFor";

type Callback<T extends jasmine.Func> = (callInfo: jasmine.CallInfo<T>) => any;

export default async function waitForSpyCall<T extends jasmine.Func>(
  spy: jasmine.Spy<T>,
  callback: Callback<T>,
  ms?: number
): Promise<jasmine.CallInfo<T>> {
  return await waitFor(() => {
    const ci = spy.calls.all().find(callback);
    spy.calls.reset();
    return ci;
  }, ms);
}
