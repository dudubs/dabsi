import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

export const RichTextImageRpc = RichTextRpc.registerDefault(
  "image-editable", // TODO: RichTextRpcForEditable
  RpcMap({
    upload: RpcFn<({ field: string }) => { url: string; key: string }>(),
  })
);
