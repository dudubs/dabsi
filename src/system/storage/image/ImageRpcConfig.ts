import SystemRequest from "@dabsi/system/core/SystemRequest";
import ImageRpc from "@dabsi/system/storage/image/ImageRpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  ImageRpc,
  {
    sysReq: SystemRequest,
  },
  c => () => {
    console.log("works", c.sysReq);
  }
);
