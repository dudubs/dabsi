import { mapObject, mapObjectAsync } from "@dabsi/common/object/mapObject";
import { Awaitable, Awaited } from "@dabsi/common/typings2/Async";

type BeforeFn = {
  <T extends object, U extends object>(
    this: T,
    builder: (context: T) => Awaitable<U>
  ): T & U;

  <T extends object, U extends Record<string, (context: T) => any>>(
    this: T,
    builderMap: U
  ): T &
    {
      [K in keyof U]: Awaited<ReturnType<U[K]>>;
    };
};
export type Tester = {
  beforeAll: BeforeFn;

  beforeEach: BeforeFn;
};

function createMethod(before) {
  return function (this, builder) {
    const t = Object.create(this);

    before(async () => {
      Object.assign(
        t,
        typeof builder === "function"
          ? await builder(this)
          : await mapObjectAsync(builder, builder => (builder as any)(t))
      );
    });

    return t;
  };
}

export const Tester: Tester = {
  beforeAll: createMethod(beforeAll),
  beforeEach: createMethod(beforeEach),
};
