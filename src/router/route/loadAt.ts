import {UndefinedArgs} from "../../common/typings";
import {Route} from "./Route";
import {AnyRouter, RouterParams} from "../Router";
import {RouterAt} from "../at";

export async function loadAt<T extends AnyRouter,
    K extends keyof T['children']>(
    this: Route<T>,
    key: string & K,
    ...[params]: UndefinedArgs<RouterParams<T['children'][K]>>
): Promise<Route<RouterAt<T, K>>> {
    const router = this.router.at(key);
    if (router.context) {
        // @ts-ignore
        return this.at(key, await router.context?.load(params));
    }
    // @ts-ignore
    return this.at(key);
}
