import {cloneObject} from "../common/object/cloneObject";
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
    const router = cloneObject(this);
    for (let plugin of plugins) {
        plugin(router);
    }
    return router;
}

Router.apply = _apply;
