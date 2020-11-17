import * as React from "react";
import { Override } from "../../common/typings2/Override";
import { RequireOptionalKeys } from "../../common/typings2/RequireOptionalKeys";
import { NoRpc } from "../NoRpc";
import { RpcConnection, RpcUnresolvedConfig } from "../Rpc";
import { testRpc } from "../RpcTester";
import { testWidgetView } from "../WidgetViewTester";
import { WidgetController } from "../widget/Widget";
import { AbstractInputHandler } from "./AbstractInputHandler";
import { AbstractInputView } from "./AbstractInputView";
import {
  AnyInput,
  Input,
  InputElement,
  InputErrorOrValue,
  InputValue,
  InputValueData,
  InputValueElement,
  TInput,
} from "./Input";
import { InputViewProps } from "./InputView";

export type TestInput = Input<
  Override<
    TInput,
    {
      Error: "ERR1";
    }
  >
>;

export const TestInput = Input<TestInput>({
  controller: NoRpc,
  handler: class extends AbstractInputHandler<TestInput> {
    getControllerConfig(): RpcUnresolvedConfig<WidgetController<AnyInput>> {
      return undefined;
    }

    getInputElement(): Promise<RequireOptionalKeys<InputElement<AnyInput>>> {
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
  getValueDataFromElement() {},
});

export class TestInputView<
  C extends RpcConnection<AnyInput>
> extends AbstractInputView<C, InputViewProps<C>> {
  renderView(): React.ReactNode {
    return undefined;
  }
}

testm(__dirname, () => {
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
});
