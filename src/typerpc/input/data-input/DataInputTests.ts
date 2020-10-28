// TODO

import { testRpc } from "../../RpcTester";
import { testInput } from "../InputTester";
import { DataInput } from "./DataInput";
import { DataInputTester } from "./DataInputTester";

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
      const realId = DataInputTester.rows[0].id;

      t.testValue(realId, realId);
    });
  });
});
