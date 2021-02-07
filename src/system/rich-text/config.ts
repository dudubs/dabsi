import RpcModule from "@dabsi/modules/rpc";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";

export default RpcConfigResolver(
  RichTextRpc,
  {
    // config:
    rpcModule: RpcModule,
  },
  c => $ =>
    $({
      getNamespaceConfig(rpc, key) {
        if (key.startsWith("readonly-")) {
        }
        return c.rpcModule.getRpcConfigResolver(rpc);
      },
    })
);
