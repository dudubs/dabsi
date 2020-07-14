import {entries} from "../../common/object/entries";
import {Route} from "../index";
import {AnyRoute} from "./Route";
import {AnyRouter} from "../Router";
import {getNextPath} from "../utils/getNextPath";

export async function routeByPath<T extends AnyRouter>(
    route: Route<T>,
    path: string
): Promise<[string, Route<T>]> {
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
    const context: any = await childRouter.context?.load(params);
    return await routeByPath((route as AnyRoute)
        .at(name, context), pathAfterParams);
}
