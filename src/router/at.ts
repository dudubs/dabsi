import {WeakMapFactory} from "../common/map/mapFactory";
import {definedAt} from "../common/object/definedAt";
import {mapObject} from "../common/object/mapObject";
import {mergePropertyDescriptors} from "../common/object/mergePropertyDescriptors";
import {AnyRouter, Router} from "./Router";


declare module "./Router" {
    interface Router {
        at: typeof _at;
        parent?: AnyRouter & any;
        childrenOwner?: AnyRouter;
    }


}

export interface IRouterAt<T extends AnyRouter> {
    routerType: T['routerType']
}

export type RouterAt<T extends AnyRouter, K extends keyof T['children']> =
    T['children'][K] &
    T['routerType'] &
    IRouterAt<T> & {
    stack: T['stack'] & Record<K, T>
};


const _getChildren = WeakMapFactory((owner: AnyRouter) =>
    mapObject(owner.children, (router: AnyRouter): AnyRouter => {

            const routerType =
                mergePropertyDescriptors(router.routerType, owner.routerType);

            return Object.setPrototypeOf({
                ...router,
                routerType,
                locationType:
                    mergePropertyDescriptors(router.locationType, owner.locationType),
                routeType:
                    mergePropertyDescriptors(router.routeType, owner.routeType),
            }, routerType);
        }
    ))

// renders -> router
function _at<T extends AnyRouter, K extends keyof T['children']>(this: T, key: K):
    RouterAt<T, K> {
    return definedAt(_getChildren(this), key);
}


Router.at = _at;


