import RichTextPluginsRpc from "@dabsi/system/rich-text/common/pluginsRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export default RichTextPluginsRpc.registerDefault(
  "image",
  RpcMap({
    upload: RpcFn<({ field: string }) => { url: string; key: string }>(),
  })
);
