import {AnyRouter} from "../Router";
import {RouterAt} from "../at";
import {Route} from "./Route";

export function stack<T extends AnyRouter, K extends keyof T['stack']>
(this: Route<T>, key: K): Route<RouterAt<T['stack'][K], K>> {
    if (this.name === key) {
        return this;
    }
    if (!this.parent)
        throw new Error(`No router "${key}" in stack.`)
    return this.parent.stack(key);
}
