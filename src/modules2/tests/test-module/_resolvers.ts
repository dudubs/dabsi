import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { TestRpc } from "@dabsi/modules2/tests/test-module/common/rpc";

export default [
  //
  RpcResolver(TestRpc, "testFn", [], () => $ =>
    $(() => {
      return "works";
    })
  ),
];
