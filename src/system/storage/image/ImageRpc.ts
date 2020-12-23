import { SystemRpc } from "@dabsi/system/core/SystemRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";

export const [ImageRpc, ImageRpcConnection] = SystemRpc.register(
  "storage-image",
  RpcFn<({ field: string }) => void>()
);

export default ImageRpc;
