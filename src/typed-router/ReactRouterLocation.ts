import {History} from "history";
import {joinUrl} from "../../server/tests/joinUrl";
import {Lazy} from "../common/patterns/lazy";
import {HasKeys, IfNever, Pluck} from "../common/typings";
import {createUndefinedContext} from "../react/utils/hooks/createUndefinedContext";
import {getNextPath} from "../router/utils/getNextPath";
import {TReactRouter} from "./ReactRouter";
import {ReactRouterError} from "./ReactRouterError";
import {Router, RouterAt, RouterType} from "./Router";

export class ReactRouterLocation<T extends TReactRouter = TReactRouter> {
    constructor(
        protected _parent: ReactRouterLocation<any> | null,
        public name: string | null,
        public history: History,
        public router: Router<T>,
        public params: T['params'],
    ) {
    }


    get parent(): IfNever<ReactRouterLocation<Extract<Pluck<T, 'parent'>, TReactRouter>>, null> {
        return <any>this._parent
    }

    get root(): ReactRouterLocation {
        return this._parent?.root || this;
    }


    // stack: { [K in keyof T['stack']]: Router<T['stack'][K]> }

    atStack<K extends keyof T['stack']>(name: string & K):
        ReactRouterLocation<T['stack'][K] & {
            routerType: T['routerType']
        }> {
        if (this.name === name)
            return <any>this;
        if (!this._parent)
            throw new ReactRouterError(`No ${name} at router stack.`)
        return this._parent.atStack(name);
    }

    @Lazy() get path(): string {
        let path: string;
        if (this.name) {
            if (this._parent) {
                path = joinUrl(this._parent.path, this.name)
            } else {
                path = "/" + this.name;
            }
        } else {
            path = this._parent?.path || "/";
        }
        for (let name of this.router.params) {
            path = joinUrl(path, String(this.params[name]))
        }
        return path;
    }

    at<K extends keyof T['children']>(name: K, ...args:
        HasKeys<T['children'][K]['params']> extends true ?
            [Record<keyof T['children'][K]['params'], any>] : []
    ):
        ReactRouterLocation<RouterType<RouterAt<T, K>>>
    at(name, ...[params]: any[]): any {

        return new ReactRouterLocation(
            this,
            name,
            this.history,
            this.router.at(name),
            params || {}
        )
    }

    push() {
        this.history.push(this.path);
    }

    route(path: string): ReactRouterRoute {
        const [name, pathAfterName] = getNextPath(path);
        if (!name) {
            return {type: 'index', location: this, path}
        }
        if (!(name in this.router.children)) {
            return {type: 'default', location: this, path}
        }
        const router = this.router.at(name);
        let params = {};
        let pathAfterParams = pathAfterName;
        for (const name of router.params) {
            let value: string;
            [value, pathAfterParams] = getNextPath(pathAfterParams);
            if (!value) {
                return {type: 'param', name, location: this}
            }
            params[name] = value;
        }
        const location = new ReactRouterLocation(
            this, name, this.history, router, params
        )
        return location.route(pathAfterParams)
    }
}

export const ReactRouterRouteContext =
    createUndefinedContext<ReactRouterRoute>();

export type ReactRouterRoute = {
    type: 'index' | 'default',
    path: string,
    location: ReactRouterLocation
} | { type: 'param', name: string, location: ReactRouterLocation };
