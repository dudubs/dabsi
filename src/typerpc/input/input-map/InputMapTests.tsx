import * as React from "react";
import { Constructor } from "../../../common/typings2/Constructor";
import { focusNextTest } from "../../../typeorm/exp/tests/focusNextTest";
import { RpcConnection } from "../../Rpc";
import { testRpc } from "../../RpcTester";
import { AnyWidgetMap } from "../../widget/widget-map/WidgetMap";
import { testWidgetView } from "../../WidgetViewTester";
import { testInput } from "../InputTester";
import { TestInputView } from "../InputTests";
import { TextInput } from "../text-input/TextInput";
import { AnyInputMap, InputMap } from "./InputMap";
import { InputMapView } from "./InputMapView";
import objectContaining = jasmine.objectContaining;

testm(__dirname, () => {
  testRpc(
    InputMap({
      text1: TextInput(),
      text2: TextInput(),
    }),
    t => {
      t.testConfig({
        text1: { minLength: 2 },
      });

      testWidgetView(
        t,
        InputMapView as Constructor<InputMapView<typeof t.connection>>,
        t => {
          t.testRender((View, props) => (
            <View
              {...props}
              value={undefined}
              children={getProps => (
                <>
                  <TestInputView {...getProps("text1")} />
                  <TestInputView {...getProps("text2")} />
                </>
              )}
            />
          ));

          it("expect child text1 will be view.", () => {
            expect(t.view.children.viewMap.text1).toBeInstanceOf(TestInputView);
          });
        }
      );

      testInput(t, t => {
        const data = { text1: "hello", text2: "world" };
        t.testValue(data, data);

        t.testError(
          "expect to errorMap",
          { ...data, text1: "x" },
          objectContaining({
            type: "ERROR_MAP",
            errorMap: objectContaining({
              text1: objectContaining({
                type: "MIN_LENGTH",
              }),
            }),
          })
        );
      });
    }
  );
});
