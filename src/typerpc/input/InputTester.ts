import { inspect } from "../../logging";
import { RpcTester } from "../RpcTester";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
} from "./Input";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";
import objectContaining = jasmine.objectContaining;
import Expected = jasmine.Expected;

export type InputTester<T extends AnyInput> = {
  readonly valueElement: InputValueElement<T>;
  testError(data, error: Expected<InputError<T>>);
  testError(title: string, data, error: Expected<InputError<T>>);

  testValue(
    data: ValueOrAwaitableFn<InputValueData<T>>,
    expectedValue: jasmine.Expected<InputValueData<T>>
  );
  testValue(
    title: string,
    data: ValueOrAwaitableFn<InputValueData<T>>,
    expectedValue: jasmine.Expected<InputValueData<T>>
  );
};

export function testInput<T extends AnyInput>(
  t: RpcTester<T>,
  callback: (tester: InputTester<T>) => void
) {
  let valueElement;

  beforeAll(async () => {
    valueElement = await t.handler.getValueElement(undefined);
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
      it(title, () => {
        return testData(data, { error });
      });
    },
    testValue(...args) {
      if (args.length === 2) {
        const [data, value] = args;
        args = [`expect to value:${inspect(value)}`, ...args];
      }
      const [title, data, value] = args;
      it(title, () => {
        return testData(data, { value });
      });
    },
  });
}
