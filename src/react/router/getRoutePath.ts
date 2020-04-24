import {mapFactory} from "../../common/map/mapFactory";
import {keys} from "../../common/object/keys";
import {AnyRoute} from "../../router";


export const getRoutePath = mapFactory(new WeakMap(), (route: AnyRoute): string => {
    const params = route.router.contextAdapter?.pack(route.context);
    let path = '';

    if (route.name) {
        path += `/${route.name}`
    }

    for (const key of keys(route.router.params)) {
        path += `/${params[key]}`;
    }

    if (!route.parent) {
        return path || '/';
    }
    const parentPath = getRoutePath(route.parent);
    if (parentPath === '/')
        return path;
    return `${parentPath}${path}`
})
