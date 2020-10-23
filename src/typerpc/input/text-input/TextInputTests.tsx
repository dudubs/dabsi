import * as React from "react";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { getTests, testRpc } from "./testRpc";
import { testWidgetView } from "./testWidgetView";
import { TextInput } from "./TextInput";
import { TextInputView } from "./TextInputView";
import arrayContaining = jasmine.arrayContaining;

// afterAll(() => {
//   console.log(a.sort());
// });

testm(__dirname, () => {
  testRpc(TextInput(), t => {
    t.testConfig({});

    // afterEach(() => {});

    testWidgetView(t, TextInputView, t => {
      t.testRender((View, props) => (
        <View {...props} value={"world"} children={() => EmptyFragment} />
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
