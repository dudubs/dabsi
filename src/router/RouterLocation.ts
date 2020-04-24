import {clone} from "../common/object/clone";
import {mergeProperties} from "../common/object/mergeProperties";
import {AnyRouter, Router, RouterParams} from "./Router";
import {RouterAt} from "./RouterAt";

declare module "./Router" {
    interface Router {
        locationType: {
            at: typeof _at;
        };
        extendLocation: typeof _extendLocation;
    }
}
declare module "./RouterAt" {
    interface IRouterAt<T> {
        locationType: T['locationType'];
    }
}

export type RouterLocationArgs<T extends AnyRouter> =
    keyof RouterParams<T> extends never ? [undefined?] :
        [RouterParams<T>];


Router.extendLocation = _extendLocation;
Router.locationType = {at: _at};


export type RouterLocation<T extends AnyRouter> = T['locationType'] & {

    at: typeof _at;
    router: T,
    params: RouterParams<T>
}


export function createRouterLocation<T extends AnyRouter>(
    parent: RouterLocation<any> | undefined,
    router: T,
    params: RouterParams<T>,
) {
    return Object.setPrototypeOf({parent, params: params ?? {}, router},
        router.locationType)
}


export type RouterLocationAt<T extends AnyRouter, K extends keyof T['children']> =
    RouterLocation<RouterAt<T, K>>;


function _at<T extends AnyRouter, K extends keyof T['children']>(
    this: RouterLocation<T>,
    key: K,
    ...[params]: RouterLocationArgs<T['children']>
):
    RouterLocationAt<T, K> {
    // @ts-ignore
    return createRouterLocation(this, this.router.at(key), params)
}


export function RouterLocation<T extends AnyRouter>(
    router: T,
    ...[params]: RouterLocationArgs<T>
): RouterLocation<T> & T['locationType'] {
    // @ts-ignore
    return createRouterLocation(undefined, router, params)
}

/*


 */

function _extendLocation<T extends AnyRouter, U extends object>(
    this: T,
    locationType: U
): T & { locationType: U } {
    return clone<any, any>(this, {
        locationType: mergeProperties(this.locationType, locationType)
    })
}

