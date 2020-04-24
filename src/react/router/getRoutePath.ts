import {keys} from "../../common/object/keys";
import {Route} from "../../router";
import {AnyRoute} from "../../router/Route";

export function getRoutePath(route: AnyRoute) {
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
    return `${getRoutePath(route.parent)}${path}`
}
