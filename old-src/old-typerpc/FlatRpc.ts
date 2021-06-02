import { Flatter } from "@dabsi/common/iterator/flat";
import { entries } from "@dabsi/common/object/entries";
import { AnyRpc } from "@dabsi/old-typerpc/Rpc";

export const flatRpc = Flatter(
  (rpc: AnyRpc) => ({ rpc, path: [] as string[] }),
  function* (node) {
    for (const [key, rpc] of entries(node.rpc.children)) {
      yield { rpc, path: [...node.path, key] };
    }
  }
);
