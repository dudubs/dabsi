import {UndefinedArgs} from "../../common/typings";
import {createRoute} from "./createRoute";
import {AnyRoute, Route} from "./Route";
import {AnyRouter} from "../Router";
import {RouterAt} from "../at";
import {RouterContextOf} from "../context";

export function at<Router extends AnyRouter, K extends keyof Router['children']>(
    this: Route<Router>,
    key: string & K,
    ...[context]: UndefinedArgs<RouterContextOf<Router['children'][K]>>
): Route<RouterAt<Router, K>> {
    return <any>createRoute({
        parent: <AnyRoute>this,
        instance: this.instance,
        context,
        name: key,
        router: this.router.at(key)
    })
}
