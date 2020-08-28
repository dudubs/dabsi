import {definedAt} from "../../common/object/definedAt";
import {Route} from "../../router/route";
import {getRoutePath} from "./getRoutePath";
import {AnyReactRouter} from "./OldReactRouter";

export function reactRouterPush<Router extends AnyReactRouter>(this: Route<Router>): void {
    definedAt(this, "history").push(getRoutePath(<any>this));
}
