import {cloneObject} from "../common/object/cloneObject";
import {Awaitable, Pluck} from "../common/typings";
import {AnyRouter, Router, RouterParams} from "./Router";


declare module "./Router" {
    interface Router<Init> {
        withContext: typeof _withContext;

        context?: RouterContext<any, any>;

    }

}

Router.withContext = _withContext;

export type RouterContext<Params, Context> = {
    load: RouterContextLoader<Params, Context>;
    pack: RouterContextPacker<Params, Context>;
};

export type RouterContextOf<Router extends AnyRouter> =
    Pluck<Router, 'contextType', undefined>

export type RouterContextLoader<Params, Context> =
    (params: Params) => Awaitable<Context>;

export type RouterContextPacker<Params, Context> =
    (context: Context) => Params;

export type RouterWithContext<Context> = {
    contextType: Context
}

function _withContext<Router extends AnyRouter, Context>(
    this: Router,
    load: RouterContextLoader<RouterParams<Router>, Context>,
    pack: RouterContextPacker<RouterParams<Router>, Context>
): Router & RouterWithContext<Context> {
    return <any>cloneObject(this, {context: {load, pack}})
}

