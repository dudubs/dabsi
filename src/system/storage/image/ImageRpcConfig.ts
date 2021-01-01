import RpcRequest from "@dabsi/system/rpc/RpcRequest";
import ImageRpc from "@dabsi/system/storage/image/ImageRpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  ImageRpc,
  {
    sysReq: RpcRequest,
  },
  c => () => {
    console.log("works", c.sysReq);
  }
);
