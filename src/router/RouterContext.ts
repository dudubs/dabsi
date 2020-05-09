import {cloneObject} from "../common/object/cloneObject";
import {Awaitable} from "../common/typings";
import {AnyRouter, Router, RouterParams} from "./Router";

declare module "./Router" {
    interface Router<Init> {

        contextAdapter: Init['contextAdapter'];
    }

    interface RouterInit {
        contextAdapter: RouterContextAdapter<any, any>;

    }

    interface DefaultRouterInit {
        contextAdapter: RouterContextAdapter<never, never>;

    }
}


export type RouterContextAdapter<P, C> = {
    load(params: P): Awaitable<C>,
    pack(context: C): P;
};

export type RouterContextAdapterType<T extends RouterContextAdapter<any, any>> =
    T extends RouterContextAdapter<any, infer U> ? U : never;

export type RouterContext<T extends AnyRouter> =
    RouterContextAdapterType<T['contextAdapter']> extends never ?
        undefined : RouterContextAdapterType<T['contextAdapter']>;


export type RouterWithContextAdapter<P, C> =
    { contextAdapter: RouterContextAdapter<P, C> };

export function RouterContext<Router extends AnyRouter, Context>(
    loader: (params: RouterParams<Router>) => Awaitable<Context>,
    packer: (context: Context) => RouterParams<Router>
): (router: Router) => Router & RouterWithContextAdapter<RouterParams<Router>, Context> {
    return router => cloneObject(router, {
        contextAdapter: {
            load: loader,
            pack: packer
        }
    })
}
