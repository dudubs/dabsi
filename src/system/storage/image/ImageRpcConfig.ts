import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import ImageRpc from "@dabsi/system/storage/image/ImageRpc";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  ImageRpc,
  {
    sysReq: RpcRequest,
  },
  c => () => {
    console.log("works", c.sysReq);
  }
);
