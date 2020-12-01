import { Flatter } from "../common/iterator/flat";
import { entries } from "../common/object/entries";
import { AnyRpc } from "./Rpc";

export const flatRpc = Flatter(
  (rpc: AnyRpc) => ({ rpc, path: [] as string[] }),
  function* (node) {
    for (const [key, rpc] of entries(node.rpc.children)) {
      yield { rpc, path: [...node.path, key] };
    }
  }
);
