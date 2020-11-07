import { Awaitable } from "../common/typings";

export type Tester = {
  beforeAll<U extends object, T extends object>(
    this: T,
    builder: (context: T) => Awaitable<U>
  ): T & U;

  beforeEach<U extends object, T extends object>(
    this: T,
    builder: (context: T) => Awaitable<U>
  ): T & U;
};

function createMethod(before) {
  return function (this, callback) {
    const t = Object.create(this);

    before(async () => {
      Object.assign(t, await callback(this));
    });

    return t;
  };
}
export const Tester: Tester = {
  beforeAll: createMethod(beforeAll),
  beforeEach: createMethod(beforeEach),
};
