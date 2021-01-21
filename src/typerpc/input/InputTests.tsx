import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { AbstractInputHandler } from "@dabsi/typerpc/input/AbstractInputHandler";
import {
  AnyInput,
  Input,
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
  TInput,
} from "@dabsi/typerpc/input/Input";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { testRpc } from "@dabsi/typerpc/RpcTester";
import { testWidgetView } from "@dabsi/typerpc/WidgetViewTester";
import React from "react";

export type TestInput = Input<
  Override<
    TInput,
    {
      Error: "ERR1";
    }
  >
>;

export const TestInput = Input<TestInput>({
  isConfigCanBeUndefined: false,
  handler: class extends AbstractInputHandler<TestInput> {
    getValueFromConfig(
      valueConfig: InputValueConfig<TestInput>
    ): Awaitable<InputValue<TestInput>> {
      return undefined;
    }

    getInputElement(): Promise<InputElement<AnyInput>> {
      return Promise.resolve({});
    }

    getValueElement(
      value: InputValue<AnyInput> | undefined
    ): Promise<InputValueElement<AnyInput>> {
      return Promise.resolve(undefined);
    }

    loadAndCheck(
      valueData: InputValueData<AnyInput>
    ): Promise<InputErrorOrValue<AnyInput>> {
      return Promise.resolve({ value: undefined });
    }
  },
  getValueDataFromValueElement() {},
});

export class TestInputView<
  C extends RpcConnection<AnyInput>
> extends AbstractInputView<C, InputViewProps<C>> {
  renderView(): React.ReactNode {
    return undefined;
  }
}

testRpc(TestInput, t => {
  t.testConfig({});

  testWidgetView(t, TestInputView, t => {
    t.testRender(
      "with-errorMap",
      (View, props) => (
        <View
          {...props}
          value={undefined}
          errorMap={{ ERR1: <>CUSTOM_ERR1</> }}
        />
      ),
      () => {
        it("expect defined errorElement for ERR1", async () => {
          await t.view.setError("ERR1");
          expect(t.view.error).toEqual("ERR1");
          expect(t.view.errorElement).toBeDefined();
        });
        it("expect undefined errorElement for ERR2", async () => {
          await t.view.setError("ERR2");
          expect(t.view.error).toEqual("ERR2");
          expect(t.view.errorElement).toBeUndefined();
        });
      }
    );
  });
});
