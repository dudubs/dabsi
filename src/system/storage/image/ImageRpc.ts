import { SystemRpc } from "@dabsi/system/common/SystemRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";

export const [ImageRpc, ImageRpcConnection] = SystemRpc.register(
  "storage-image",
  RpcFn<({ field: string }) => void>()
);

console.log("???");

export default ImageRpc;
