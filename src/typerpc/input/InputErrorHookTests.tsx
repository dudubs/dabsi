import React from "react";
import { logBeforeEach } from "../../jasmine/logBeforeEach";
import { testRpc } from "../RpcTester";
import { testWidgetView } from "../WidgetViewTester";
import { InputErrorHook } from "./InputErrorHook";
import { InputErrorHookView } from "./InputErrorHookView";
import { testInput } from "./InputTester";
import { TestInput, TestInputView } from "./InputTests";
import { TextInput } from "./text-input/TextInput";

// InputValueHook()
testm(__filename, () => {
  testRpc(InputErrorHook<"INVALID">()(TextInput()), t => {
    t.testConfig({
      $check(value) {
        if (value === "invalid") {
          return "INVALID";
        }
      },
    });

    testInput(t, t => {
      t.testError("invalid", "INVALID");
    });
  });
  testRpc(InputErrorHook<"ERR2">()(TestInput), t => {
    testWidgetView(t, InputErrorHookView, t => {
      t.testRender((View, props) => (
        <View
          {...props}
          value={undefined}
          errorMap={{ ERR2: <>CUSTOM_ERR2</> }}
          children={(props, error) => (
            <TestInputView
              {...props}
              errorMap={{
                ERR1: <>CUSTOM_ERR1</>,
              }}
            />
          )}
        />
      ));

      describe("expect errorElement for ERR1 will be by", () => {
        it("Hook", async () => {
          await t.view.setError("ERR1");
          expect(t.view.errorElement).toBeUndefined();
          expect(t.view.target!.errorElement).toBeDefined();
        });
        it("Target", async () => {
          await t.view.setError("ERR2");
          expect(t.view.errorElement).toBeDefined();
          expect(t.view.target!.errorElement).toBeUndefined();
        });
      });
    });
  });
});
