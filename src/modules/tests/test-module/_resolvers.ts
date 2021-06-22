import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { TestRpc } from "@dabsi/modules/tests/test-module/common/rpc";

export default [
  //

  RpcResolverBuilder({
    for: TestRpc,
    at: "testFn",
    configure: () => $ =>
      $(() => {
        return "works";
      }),
  }),
];
