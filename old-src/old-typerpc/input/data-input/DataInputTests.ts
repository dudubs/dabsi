// TODO

import { testRpc } from "@dabsi/old-typerpc/RpcTester";
import { testInput } from "@dabsi/old-typerpc/input/InputTester";
import { DataInput } from "@dabsi/old-typerpc/input/data-input/rpc";
import { DataInputTester } from "@dabsi/old-typerpc/input/data-input/DataInputTester";

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
