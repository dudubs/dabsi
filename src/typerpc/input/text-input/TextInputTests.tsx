import * as React from "react";
import { EmptyFragment } from "@dabsi/react/utils/EmptyFragment";
import { testRpc } from "@dabsi/typerpc/RpcTester";
import { testWidgetView } from "@dabsi/typerpc/WidgetViewTester";
import { testInput } from "@dabsi/typerpc/input/InputTester";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { TextInputView } from "@dabsi/typerpc/input/text-input/TextInputView";
import objectContaining = jasmine.objectContaining;

// afterAll(() => {
//   console.log(a.sort());
// });

testm(__dirname, () => {
  testRpc(TextInput(), t => {
    t.testConfig({
      minLength: 2,
      maxLength: 6,
      trim: true,
      required: true,
      pattern: /^\w+$/,
    });

    testInput(t, t => {
      t.testError("x", objectContaining({ type: "MIN_LENGTH" }));
      t.testError(
        "xxxxxxx",
        objectContaining({
          type: "MAX_LENGTH",
        })
      );
      t.testError("x x x", objectContaining({ type: "INVALID_PATTERN" }));
      t.testValue(" x ", "x");
    });
    testWidgetView(t, TextInputView, t => {
      t.testRender((View, props) => (
        <View {...props} value={"hello"} children={() => EmptyFragment} />
      ));

      it("expect setValue before validate", async () => {
        const p = t.view.setText("world");
        expect(t.view.value).toEqual("hello");
        await t.view.validate();
        expect(t.view.value).toEqual("world");
        await p;
      });
    });
  });
});
