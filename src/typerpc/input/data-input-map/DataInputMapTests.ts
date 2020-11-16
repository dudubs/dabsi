import { testRpc } from "../../RpcTester";
import { DataInputTester } from "../data-input/DataInputTester";
import { testInput } from "../InputTester";
import { NumberInput } from "../number-input/NumberInput";
import { DataInputMap } from "./DataInputMap";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

testm(__dirname, () => {
  testRpc(DataInputMap(NumberInput()), t => {
    t.testConfig($ =>
      $({
        source: DataInputTester.source,
        columns: {
          label: "text",
        },
        targetConfig: { maxValue: 10 },
        getTargetValue: row => row.text.length,
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
});
