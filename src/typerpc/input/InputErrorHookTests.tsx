import { createElement, useState } from "react";

import { testRpc } from "../RpcTester";
import { testWidgetView } from "../WidgetViewTester";
import { InputErrorHook, InputErrorHookView } from "./InputErrorHook";
import { TestInput, TestInputView } from "./InputTests";

describe(__filename, () => {
  testRpc(InputErrorHook<"ERR2">()(TestInput), t => {
    testWidgetView(t, InputErrorHookView, t => {
      t.testRender((View, props) => (
        <View
          {...props}
          value={undefined}
          errorMap={{ ERR2: "CUSTOM_ERR2" }}
          children={(props, error) => (
            <TestInputView
              {...props}
              errorMap={{
                ERR1: "CUSTOM_ERR1",
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
