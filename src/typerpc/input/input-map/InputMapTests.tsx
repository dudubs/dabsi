import * as React from "react";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { RpcTester } from "../tests/RpcTester";
import { TestInputView } from "../tests/TestInputView";
import { TextInput } from "../text-input/TextInput";
import { TextInputView } from "../text-input/TextInputView";
import { InputMap } from "./InputMap";
import { InputMapView } from "./InputMapView";

testm(__dirname, () => {
  const t = new RpcTester(
    InputMap({
      text1: TextInput(),
      text2: TextInput(),
    })
  );

  t.testConfig("default", {
    text1: { default: "hello" },
    text2: { default: "world" },
  });

  let text1Input: TestInputView;
  let text2Input: TestInputView;

  t.testWidgetView(InputMapView, t => {
    t.testProps("", (View, props) => (
      <View.Fields
        {...props}
        fields={{
          text1: props => (
            <TestInputView
              {...props}
              ref={current => (text1Input = current!)}
            />
          ),
          text2: props => (
            <TestInputView
              {...props}
              ref={current => (text2Input = current!)}
            />
          ),
        }}
      />
    ));

    t.test("", () => {
      expect(t.view.value).toEqual({
        text1: "hello",
        text2: "world",
      });
    });
  });
});
