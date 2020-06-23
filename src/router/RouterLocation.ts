import {cloneObject} from "../common/object/cloneObject";
import {mergeProperties} from "../common/object/mergeProperties";
import {UndefinedArgs, UndefinedIfNoKeys, UndefinedObject} from "../common/typings";
import {AnyRouter, Router, UndefinedRouterParams} from "./Router";
import {RouterAt} from "./RouterAt";
import {RouterInstanceOf} from "./RouterInstance";


declare module "./Router" {
    interface Router {
        locationType: { at: typeof _at; };
        extendLocation: typeof _extend;
    }
}
declare module "./RouterAt" {
    interface IRouterAt<T> {
        locationType: T['locationType'];
    }
}


Router.extendLocation = _extend;
Router.locationType = {at: _at};


export type RouterLocation<T extends AnyRouter> = T['locationType'] & T['instanceType'] & {
    at: typeof _at;
    router: T,
    params: UndefinedRouterParams<T>
    instance: RouterInstanceOf<T>;
}

export function AnyRouterLocation(
    props: {
        parent: RouterLocation<any> | undefined,
        router: AnyRouter,
        instance: object | undefined,
        params: Record<string, any> | undefined
    }) {
    return Object.setPrototypeOf({
        ...props.instance, instance: props.instance,
        parent: props.parent,
        router: props.router,
        params: props.params
    }, props.router.locationType)

}


function _at<T extends AnyRouter, K extends keyof T['children']>(
    this: RouterLocation<T>,
    key: K,
    ...[params]: UndefinedArgs<UndefinedRouterParams<T['children'][K]>>
): RouterLocation<RouterAt<T, K>> {
    return AnyRouterLocation({
        parent: this,
        router: this.router.at(key),
        instance: this.instance,
        params
    });
}

export type RouterLocationProps<T extends AnyRouter> = {
    params: UndefinedRouterParams<T>,
    instance: UndefinedIfNoKeys<RouterInstanceOf<T>>
};

export function RouterLocation<T extends AnyRouter>(
    router: T,
    ...[props]: UndefinedArgs<UndefinedObject<RouterLocationProps<T>>>
): RouterLocation<T> {

    return AnyRouterLocation({
        parent: undefined,
        router,
        params: (<RouterLocationProps<T>>props)?.params,
        instance: (<RouterLocationProps<T>>props)?.instance,
    });
}

function _extend<T extends AnyRouter, U extends object>(
    this: T,
    locationType: U
): T & { locationType: U } {
    return cloneObject<any, any>(this, {
        locationType: mergeProperties(this.locationType, locationType)
    })
}

