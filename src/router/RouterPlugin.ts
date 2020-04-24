import {clone} from "../common/object/clone";
import {AnyRouter, Router} from "./Router";


declare module "./Router" {
    interface Router {

        apply: typeof _apply;
    }
}


export type RouterPlugin<T extends AnyRouter> = (router: T) => void;




export function _apply<T extends AnyRouter>(
    this: T,
    ...plugins: RouterPlugin<T>[]
): T {
    const router = clone(this);
    for (let plugin of plugins) {
        plugin(router);
    }
    return router;
}

Router.apply = _apply;
