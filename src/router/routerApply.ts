import {AnyRouter, Router} from "./Router";


export type RouterPlugin<T extends AnyRouter> = (router: T) => void;

declare module "./Router" {


    interface Router {
        apply: typeof routerApply;
    }
}


Router.apply = routerApply;


function routerApply<T extends AnyRouter>(
    this: T,
    ...plugins: RouterPlugin<T>[]
): T {
    const router = this;
    for (let plugin of plugins) {
        plugin(router);
    }
    return router;
}
