import {AnyRouter} from "../Router";
import {Route} from "./Route";

export function routeStack<Router extends AnyRouter,
    K extends keyof Router['stackType']>
(this: Route<Router>, key: K): Route<Router['stackType'][K]> {

    if (this.name === key) {
        return <any>this;
    }
    if (!this.parent)
        throw new Error(`No router "${key}" in stack.`)
    return <any>this.parent.stack(key as any);
}
