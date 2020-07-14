import nodeFetch from "node-fetch";
import {Lazy} from "../common/patterns/lazy";

declare global {
    // let fetch: typeof nodeFetch;
}


export const useNodeFetch = Lazy(() => {
    global['fetch'] = nodeFetch;
});
