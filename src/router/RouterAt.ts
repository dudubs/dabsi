import {mapFactory} from "../common/map/mapFactory";
import {definedAt} from "../common/object/defined";
import {mapObject} from "../common/object/mapObject";
import {mergeProperties} from "../common/object/mergeProperties";
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
    IRouterAt<T>;


const _getChildren = mapFactory(new WeakMap(), (owner: AnyRouter) =>
    mapObject(owner.children, (router: AnyRouter): AnyRouter => {

            const routerType =
                mergeProperties(router.routerType, owner.routerType);

            const x = Object.setPrototypeOf({
                ...router,
                routerType,
                // {...router.routerType, ...owner.routerType},
                locationType:
                    mergeProperties(router.locationType, owner.locationType),
                // {...router.locationType, ...owner.locationType},
                routeType:
                    mergeProperties(router.routeType, owner.routeType),
                // {...router.routeType, ...owner.routeType}
            }, routerType);


            return ({
                ...router,
                ...owner.routerType,
                routerType: {...router.routerType, ...owner.routerType},
                locationType: {...router.locationType, ...owner.locationType},
                routeType: {...router.routeType, ...owner.routeType}
            });
        }
    ))

// renders -> router
function _at<T extends AnyRouter, K extends keyof T['children']>(this: T, key: K):
    RouterAt<T, K> {
    return definedAt(_getChildren(this), key);
}


Router.at = _at;


