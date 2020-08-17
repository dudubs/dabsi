import {cloneObject} from "../common/object/cloneObject";
import {HasKeys} from "../common/typings";
import {AnyRouter, Router} from "./Router";

declare module "./Router" {
    interface RouterProps {
        params: Record<string, (value: string) => any>

    }
    interface Router {
        param: typeof routerParam;
        params: {};
    }
}


export type RouterWithParam<K extends string, V> =
    { params: Record<K, (value: string) => V> };

export function routerParam<Router extends AnyRouter, K extends string, V = string>
(this: Router, key: K, parser?: (value: string) => V):
    Router & RouterWithParam<K, V> {
    return cloneObject(this, {
        params: {
            ...this.params,
            [key]: parser ?? String
        }
    })
}

export type RouterParamLoader = (value: string) => any;

export type RouterParams<Router extends AnyRouter> =
    HasKeys<Router['params']> extends false ? never : {
        [K in keyof Router['params']]:
        ReturnType<Extract<Router['params'][K], RouterParamLoader>>
    };
