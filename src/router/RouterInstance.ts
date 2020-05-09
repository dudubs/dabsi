import {UndefinedIfNoKeys} from "../common/typings";
import {AnyRouter, Router} from "./Router";


declare module "./Router" {
    interface Router {
        instanceType: {};

        extendInstance: typeof _extend;
    }
}

// Router

Router.extendInstance = _extend;


export type RouterWithInstanceType<U> = { instanceType: U };


export type RouterInstance<Router extends AnyRouter> =
    UndefinedIfNoKeys<Router['instanceType']>;

function _extend<T extends AnyRouter>(this: T):
    <U extends object>() => T & RouterWithInstanceType<U> {
    return () =><any> this;
}
