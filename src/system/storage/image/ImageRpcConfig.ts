import SystemRpcRequest from "@dabsi/system/core/SystemRpcRequest";
import ImageRpc from "@dabsi/system/storage/image/ImageRpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  ImageRpc,
  {
    sysReq: SystemRpcRequest,
  },
  c => () => {
    console.log("works", c.sysReq);
  }
);
