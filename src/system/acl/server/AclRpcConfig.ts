import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclRpc } from "../common";

export const AclRpcConfig = RpcConfigResolver(AclRpc, {}, () => {
  return $ => {
    throw new Error();
  };
});
