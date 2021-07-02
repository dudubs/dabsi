import { Expect } from "@dabsi/common/typings2/Expect";
import { RpcFuncational } from "@dabsi/typerpc/decorators";
import {
  Input,
  InputError,
  inputValueElementToData,
} from "@dabsi/typerpc/input/Input";
import {
  inputBaseConfig,
  InputWithConfig,
} from "@dabsi/typerpc/input/InputHandler";
import { InputWithCustomError } from "@dabsi/typerpc/input/InputWithCustomError";
import { InputWithCustomValue } from "@dabsi/typerpc/input/InputWithCustomValue";
import { RpcMethod } from "@dabsi/typerpc/Rpc";

import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";

export function typingTests() {
  class TestInput1 extends Input<
    string,
    string,
    "ERR1" | "ERR2",
    {
      xs: string;
    }
  > {
    [inputValueElementToData](element: string): string {
      throw new Error("Method not implemented.");
    }

    @RpcFuncational() testFn!: RpcMethod;
  }

  interface TestInput1
    extends InputWithConfig<TestInput1, {}, string, string> {}

  class TestInput1WithExtraErr extends InputWithCustomError<"EXTRA_ERR">()(
    TestInput1
  ) {}

  class TestInput1WithValue1 extends InputWithCustomValue<"VALUE1">()(
    TestInput1
  ) {}

  let t1: TestInput1;
  let t2: TestInput1WithExtraErr;

  t1!.testFn();

  t2!.testFn();

  type _ = [
    //
    Expect<InputError<TestInput1>, "ERR1">,
    // @ts-expect-error
    Expect<InputError<TestInput1>, "ERRX">,
    //
    Expect<InputError<TestInput1WithExtraErr>, "ERR1">,
    // @ts-expect-error
    Expect<InputError<TestInput1WithExtraErr>, "ERRX">,
    //
    Expect<InputError<TestInput1WithExtraErr>, "EXTRA_ERR">,
    //
    Expect<RpcConfigurator<TestInput1>, "hello">,
    Expect<
      RpcConfigurator<TestInput1WithValue1>,
      {
        config: "";

        [inputBaseConfig]: { load: () => { value: "VALUE1" } };
      }
    >,
    Expect<
      RpcConfigurator<TestInput1WithValue1>,
      // @ts-expect-error
      {
        config: "";
        load: () => { value: "VALUEX" };
      }
    >
  ];
}
