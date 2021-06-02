import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { TestRpc } from "@dabsi/modules/tests/test-module/common/rpc";

export default [
  //
  RpcResolver(TestRpc.at("testFn"), [], () => $ =>
    $(() => {
      return "works";
    })
  ),
];
