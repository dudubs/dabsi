import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { DataInputTester } from "@dabsi/old-typerpc/input/data-input/DataInputTester";
import { testInput } from "@dabsi/old-typerpc/input/InputTester";
import { NumberInput } from "@dabsi/old-typerpc/input/number-input/NumberInput";
import { DataInputMap } from "@dabsi/old-typerpc/input/data-input-map/DataInputMap";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

testRpc(DataInputMap(NumberInput()), t => {
  t.testConfig($ =>
    $({
      source: DataInputTester.source,
      targetConfig: { maxValue: 10 },
      getRowValue: row => row.text.length,
      getRowLabel: row => row.text,
    })
  );

  testInput(t, t => {
    t.testValue({}, {});
    const id1 = () => DataInputTester.rows[0].id;
    const id2 = () => DataInputTester.rows[1].id;
    const validData = () => ({ [id1()]: 1, [id2()]: 2 });
    t.testValue(validData, validData);
    t.testError(
      "expect to invalid keys error",
      { x: 1 },
      objectContaining({
        invalidKeys: arrayContaining(["x"]),
      })
    );
    t.testError(
      "expect to target error",
      () => ({ ...validData(), [id2()]: 101 }),
      () =>
        objectContaining({
          errorMap: objectContaining({
            [id2()]: objectContaining({
              type: "MAX_VALUE",
            }),
          }),
        })
    );
  });
});
