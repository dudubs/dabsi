import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { SystemTestingRpc } from "@dabsi/system/testing/common/SystemTestingRpc";

export default RpcResolver(
  SystemTestingRpc.at("sayHello"),
  { rpcReq: RpcRequest },
  c => ({ name }) => {
    if (name in c.rpcReq.body) {
      name = c.rpcReq.body[name];
    }
    return `Hello ${name}!`;
  }
);
