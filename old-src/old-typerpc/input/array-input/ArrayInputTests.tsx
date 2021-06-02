import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { NumberInput } from "@dabsi/old-typerpc/input/number-input/NumberInput";
import { testInput } from "@dabsi/old-typerpc/input/InputTester";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { ArrayInput } from "@dabsi/old-typerpc/input/array-input/ArrayInput";
import objectContaining = jasmine.objectContaining;

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
