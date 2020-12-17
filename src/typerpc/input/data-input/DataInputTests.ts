// TODO

import { testRpc } from "@dabsi/typerpc/RpcTester";
import { testInput } from "@dabsi/typerpc/input/InputTester";
import { DataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import { DataInputTester } from "@dabsi/typerpc/input/data-input/DataInputTester";

testm(__dirname, () => {
  testRpc(DataInput(), t => {
    t.testConfig($ =>
      $({
        source: DataInputTester.source,
        columns: { label: "text" },
      })
    );

    testInput(t, t => {
      t.testError("x", "INVALID_DATA_KEY");

      const realId = () => DataInputTester.rows[0].id;
      t.testValue(realId, realId);
    });
  });
});
