import {cloneObject} from "../common/object/cloneObject";
import {Awaitable, Pluck} from "../common/typings";
import {AnyRouter, Router} from "./Router";
import {RouterParams} from "./routerParam";

declare module "./Router" {
    interface Router {

        withContext: typeof routerWithContext;

        contextAdapter?: RouterContextAdapter<any, any>;
    }
}

Router.withContext = routerWithContext;

export type RouterContextAdapter<Params, Context> = {
    load: RouterContextLoader<Params, Context>;
    pack: RouterContextPacker<Params, Context>;
};

export type RouterContextType<Router> =
    Pluck<Router, 'contextType'>;


export type RouterContextLoader<Params, Context> =
    (params: Params) => Awaitable<Context>;

export type RouterContextPacker<Params, Context> =
    (context: Context) => Params;

export type RouterWithContext<Context> = {
    contextType: Context
}

function routerWithContext<Router extends AnyRouter, Context>(
    this: Router,
    load: RouterContextLoader<RouterParams<Router>, Context>,
    pack: RouterContextPacker<RouterParams<Router>, Context>
): Router & RouterWithContext<Context> {
    return <any>cloneObject(this, {contextAdapter: {load, pack}})
}

