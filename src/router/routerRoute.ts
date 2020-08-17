import {cloneObject} from "../common/object/cloneObject";
import {AnyRouter, Router, RouterWithChild} from "./Router";

declare module "./Router" {
    interface Router {
        route: typeof routerRoute;
    }
}

export function routerRoute<TRouter extends AnyRouter,
    K extends string,
    ChildRouter extends AnyRouter = Router>(
    this: TRouter,
    key: K,
    router?: ChildRouter
):
    TRouter & RouterWithChild<K, ChildRouter> {
    return <any>cloneObject(this, {
        children: {
            ...this.children,
            [key]: router ?? Router
        }
    })

}
