import {HasKeys} from "../common/typings";
import {AnyRouter, Router} from "./Router";


declare module "./Router" {

    interface RouterProps {
        instanceType: any;
    }

    interface Router {

        instanceType: {};
        extendInstance: typeof extendInstance;
    }
}

Router.extendInstance = extendInstance;


export type RouterWithInstanceType<U> = { instanceType: U };

export type RouterInstanceType<Router extends AnyRouter> =
    HasKeys<Router['instanceType']> extends true ? Router['instanceType'] : never;

export function extendInstance<T extends AnyRouter>(this: T):
    <U extends object>() => T & RouterWithInstanceType<U> {
    return () => <any>this;
}
