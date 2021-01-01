import React from "react";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { focusNextTest } from "@dabsi/typeorm/exp/tests/focusNextTest";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { testRpc } from "@dabsi/typerpc/RpcTester";
import { AnyWidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { testWidgetView } from "@dabsi/typerpc/WidgetViewTester";
import { testInput } from "@dabsi/typerpc/input/InputTester";
import { TestInputView } from "@dabsi/typerpc/input/InputTests";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { AnyInputMap, InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { InputMapView } from "@dabsi/typerpc/input/input-map/InputMapView";
import objectContaining = jasmine.objectContaining;

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
            children={view => (
              <>
                <TestInputView {...view.getChildProps("text1")} />
                <TestInputView {...view.getChildProps("text2")} />
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
