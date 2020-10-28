import * as React from "react";
import { Constructor } from "../../../common/typings";
import { testRpc } from "../../RpcTester";
import { testWidgetView } from "../../WidgetViewTester";
import { testInput } from "../InputTester";
import { TestInputView } from "../InputTests";
import { TextInput } from "../text-input/TextInput";
import { InputMap } from "./InputMap";
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
        text1: { minLength: 2, default: "hello" },
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
        it("expect to default value of text1", () => {
          expect(t.valueElement).toEqual(
            objectContaining({
              text1: "hello",
            })
          );
        });

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
