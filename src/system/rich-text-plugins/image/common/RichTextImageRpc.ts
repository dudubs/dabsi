import {
  RichTextRpc,
  RichTextRpcForEditable,
} from "@dabsi/system/rich-text/common/rpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export default RichTextRpc.registerDefault(
  "image", // TODO: RichTextRpcForEditable
  RpcMap({
    upload: RpcFn<({ field: string }) => { url: string; key: string }>(),
  })
);
