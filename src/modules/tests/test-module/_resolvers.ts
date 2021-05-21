import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { TestRpc } from "@dabsi/modules/tests/test-module/common/rpc";

export default [
  //
  RpcResolver(TestRpc, "testFn", [], () => $ =>
    $(() => {
      return "works";
    })
  ),
];
