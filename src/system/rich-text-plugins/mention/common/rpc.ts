import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const RichTextMentionRpc = RpcMap({
  getSuggestions: RpcFn<(text: string) => [key: string, name: string][]>(),
});
