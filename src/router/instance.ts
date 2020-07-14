import {UndefinedIf} from "../common/typings";
import {AnyRouter, Router} from "./Router";


declare module "./Router" {
    interface Router {
        instanceType: {};
        extendInstance: typeof extendInstance;
    }
}

// Router

Router.extendInstance = extendInstance;


export type RouterWithInstanceType<U> = { instanceType: U };

export type RouterInstanceOf<Router extends AnyRouter> =
    UndefinedIf<Router['instanceType'], never>;

function extendInstance<T extends AnyRouter>(this: T):
    <U extends object>() => T & RouterWithInstanceType<U> {
    return () => <any>this;
}
