import RichTextInputRpc from "@dabsi/system/rich-text/common/RichTextInputRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export default RichTextInputRpc.registerDefault(
  "image",
  RpcMap({
    upload: RpcFn<({ field: string }) => { url: string }>(),
  })
);
