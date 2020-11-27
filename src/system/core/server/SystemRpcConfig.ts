import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { SystemRpc } from "../common/SystemRpc";
import { SystemRequest } from "../SystemRequest";

export const SystemRpcConfig = RpcConfigResolver(
  SystemRpc,
  {
    sysReq: SystemRequest,
  },
  c => $ =>
    $({
      getNamespaceConfig(rpc) {
        return c.sysReq.getUnresolvedConfig(rpc);
      },
    })
);
