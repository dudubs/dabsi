import {OptionalArg} from "../../common/typings";
import {AnyRouter} from "../Router";
import {RouterAt} from "../routerAt";
import {RouterParams} from "../routerParam";
import {Route} from "./Route";

export async function routeLoadAt<//
    Router extends AnyRouter,
    K extends keyof Router['children']>(
    this: Route<Router>,
    key: string & K,
    ...[params]: OptionalArg<RouterParams<Router['children'][K]>>
): Promise<Route<RouterAt<Router, K>>> {


    const router = this.router.at(key) as AnyRouter;
    if (router.contextAdapter) {
        // @ts-ignore
        return this.at(key, await router.contextAdapter?.load(params));
    }
    // @ts-ignore
    return this.at(key);
}
