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
        contextAdapter: never;

    }
}


export type RouterContextAdapter<T extends AnyRouter, C> = {
    load(params: RouterParams<T>): Awaitable<C>,
    pack(context: C): RouterParams<T>;
};

export type RouterContextAdapterType<T extends RouterContextAdapter<any, any>> =
    T extends RouterContextAdapter<any, infer U> ? U : never;

export type RouterContext<T extends AnyRouter> =
    RouterContextAdapterType<T['contextAdapter']> extends never ?
        undefined : RouterContextAdapterType<T['contextAdapter']>;


export function RouterContext<T extends AnyRouter, C>(
    loader: (params: RouterParams<T>) => Awaitable<C>,
    packer: (context: C) => RouterParams<T>
): (router: T) => T & { contextAdapter: RouterContextAdapter<T, C> } {
    return router => ({
        ...router,
        contextAdapter: {
            load: loader,
            pack: packer
        }
    })
}
