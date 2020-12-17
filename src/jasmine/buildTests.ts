import { entries } from "@dabsi/common/object/entries";

export function buildTests(title: string, callback: () => void) {
  const builders: any[] = [];

  const globalBefore = {
    it,
    fit,
    describe,
    fdescribe,
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
  };

  for (const [key, func] of entries<any>(globalBefore)) {
    global[key] = function (...args) {
      builders.push(() => {
        return global[key].apply(global, args);
      });
    };
  }

  callback();

  Object.assign(global, globalBefore);

  return () => {
    for (const builder of builders) {
      builder();
    }
  };
}
