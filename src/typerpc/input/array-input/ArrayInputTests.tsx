import { testRpc } from "../../RpcTester";
import { InputMap } from "../input-map/InputMap";
import { NumberInput } from "../number-input/NumberInput";
import { testInput } from "../InputTester";
import { TextInput } from "../text-input/TextInput";
import { ArrayInput } from "./ArrayInput";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {
  testRpc(
    ArrayInput(
      InputMap({
        text: TextInput(),
        num: NumberInput(),
      }),
      {
        newItem: TextInput(),
        isUniqueItem: true,
        getItemDataKey: data => data.text.toUpperCase(),
        getNewItemDataKey: text => text.toUpperCase(),
      }
    ),
    t => {
      testInput(t, t => {
        const data = { text: "hello", num: 100 };
        t.testValue([data], [data]);
        t.testError(
          [data, { ...data, num: 101 }],
          objectContaining({
            errorMap: objectContaining({
              HELLO: "UNIQUE_ITEM",
            }),
          })
        );
      });
    }
  );
});
