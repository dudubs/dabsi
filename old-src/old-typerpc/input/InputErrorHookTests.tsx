import { InputErrorHook } from "./InputErrorHook";
import { InputErrorHookView } from "@dabsi/old-typerpc/input/InputErrorHookView";
import { testInput } from "@dabsi/old-typerpc/input/InputTester";
import { TestInput, TestInputView } from "@dabsi/old-typerpc/input/InputTests";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { testWidgetView } from "@dabsi/old-typerpc/WidgetViewTester";
import React from "react";

// InputValueHook()

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
