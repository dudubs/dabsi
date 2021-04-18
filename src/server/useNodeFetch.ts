import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import nodeFetch from "node-fetch";

declare global {
  // let fetch: typeof nodeFetch;
}

export const useNodeFetch = SingleCall(() => {
  global["fetch"] = nodeFetch;
});
