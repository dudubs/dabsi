import { inspect } from "@dabsi/logging/inspect";
import { RpcTester } from "@dabsi/old-typerpc/RpcTester";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { ValueOrAwaitableFn } from "@dabsi/old-typerpc/input/ValueOrAwaitableFn";
import objectContaining = jasmine.objectContaining;
import Expected = jasmine.Expected;

export type InputTester<T extends AnyInput> = {
  readonly valueElement: InputValueElement<T>;
  testError(data, error: ValueOrAwaitableFn<Expected<InputError<T>>>);
  testError(
    title: string,
    data,
    error: ValueOrAwaitableFn<Expected<InputError<T>>>
  );

  testValue(
    data: ValueOrAwaitableFn<InputValueData<T>>,
    expectedValue: ValueOrAwaitableFn<jasmine.Expected<InputValueData<T>>>
  );

  testValue(
    title: string,
    data: ValueOrAwaitableFn<InputValueData<T>>,
    expectedValue: ValueOrAwaitableFn<jasmine.Expected<InputValueData<T>>>
  );
};

export function testInput<T extends AnyInput>(
  t: RpcTester<T>,
  callback: (tester: InputTester<T>) => void
) {
  let valueElement;

  beforeAll(async () => {
    valueElement = await t.handler.getInputValueElement(undefined);
  });

  async function testData(data, result) {
    expect(
      await t.handler.loadAndCheck(await ValueOrAwaitableFn(data))
    ).toEqual(objectContaining(result));
  }

  callback({
    get valueElement() {
      return valueElement;
    },
    testError(...args) {
      if (args.length === 2) {
        const [data, error] = args;
        args = [`expect to error:${inspect(error)}`, ...args];
      }
      const [title, data, error] = args;
      it(title, async () => {
        return testData(await ValueOrAwaitableFn(data), {
          error: await ValueOrAwaitableFn(error),
        });
      });
    },
    testValue(...args) {
      if (args.length === 2) {
        const [data, value] = args;
        args = [`expect to value:${inspect(value)}`, ...args];
      }
      const [title, data, value] = args;
      it(title, async () => {
        return testData(data, { value: await ValueOrAwaitableFn(value) });
      });
    },
  });
}
