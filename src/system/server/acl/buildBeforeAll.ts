import { Awaitable, Override } from "../../../common/typings";

type BuildBeforeFn = {
  <U extends object, T extends object>(
    base: U | ((b: BuildBeforeFn) => U),
    get: (base: U) => Awaitable<T>
  ): Override<U, T>;
  <T extends object>(get: (t: never) => Awaitable<T>): T;
};

function createBuildBeforeFn(before): BuildBeforeFn {
  return function buildFn(...args) {
    let base;
    let get;
    const value = {};

    if (args.length === 2) {
      [base, get] = args;
      if (typeof base == "function") {
        base = base(buildFn);
      }
    } else {
      get = args[0];
      base = {};
    }

    before(async () => {
      Object.setPrototypeOf(
        value,
        Object.setPrototypeOf(await get(base), base)
      );
    });
    return value;
  };
}

export const buildBeforeAll = createBuildBeforeFn(beforeAll);
export const buildBeforeEach = createBuildBeforeFn(beforeEach);
