import { SystemRpc } from "@dabsi/system/core/common/rpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const [SystemTestingRpc, SystemTestingConnection] = SystemRpc.register(
  "testing",
  RpcMap({
    sayHello: RpcFn<({ name: string }) => string>(),
  })
);
