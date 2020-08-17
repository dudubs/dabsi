import {entries} from "../../common/object/entries";
import {AnyRouter} from "../Router";
import {getNextPath} from "../utils/getNextPath";
import {Route} from "./Route";
import {anyRouteAt} from "./routeAt";

export async function routeByPath<Router extends AnyRouter = AnyRouter>(
    route: Route<Router>,
    path: string
): Promise<[string, Route<Router>]> {
    const {router: {children}, router} = route;
    const [name, pathAfterName] = getNextPath(path);
    // console.log({name, pathAfterName});
    if (!name) {
        return [path, route];
    }
    if (!(name in children)) {
        if ('default' in children) {
            // @ts-ignore
            return [path, route.at('default')]
        }
        return [path, route]
    }
    const childRouter = router.at(name);
    const params = {};
    let pathAfterParams = pathAfterName;
    for (const [key, parse] of entries<any>(childRouter.params)) {
        let value: string;
        [value, pathAfterParams] = getNextPath(pathAfterParams);
        params[key] = parse(value)
    }
    const context: any = await childRouter.contextAdapter?.load(params);

    return await routeByPath<Router>(
        anyRouteAt<Router>(route, name, context), pathAfterParams);
}
