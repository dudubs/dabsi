import { testRpc } from "@dabsi/typerpc/RpcTester";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { NumberInput } from "@dabsi/typerpc/input/number-input/NumberInput";
import { testInput } from "@dabsi/typerpc/input/InputTester";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import { ArrayInput } from "@dabsi/typerpc/input/array-input/ArrayInput";
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
