import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

export const RichTextMentionRpc = RpcMap({
  getSuggestions: RpcFn<(text: string) => [key: string, name: string][]>(),
});
