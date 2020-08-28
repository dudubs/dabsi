import {defined} from "../common/object/defined";
import {inspect} from "../logging";

export type TRouter = {
    params: object

    children: Record<string, TRouter>

    stack: Record<string, TRouter>

    routerType: typeof RouterType;

}


export type TEmptyRouter = {
    params: {},
    children: {},
    stack: {}
    routerType: typeof RouterType
};

export type Router<T extends TRouter = TEmptyRouter> = {


    TRouter?: T;

    params: string[];

    routerType: object;

    children: Record<string, Router<TRouter & Pick<T, 'routerType'>>>

    parent?: AnyRouter;

} & T['routerType'];


export function Router(): Router
export function Router<T extends Record<string, AnyRouter>>(children: T): Router<TEmptyRouter & {
    children: { [K in keyof T]: RouterType<T[K]> }
}>
export function Router<K extends string,
    T extends Record<string, AnyRouter> = {}>(params: K[], children?: T): Router<TEmptyRouter & {
    children: { [K in keyof T]: RouterType<T[K]> }
    params: Record<K, string>
}>
export function Router(...args): AnyRouter {
    let params: string[];
    let children: Record<string, AnyRouter>;

    if (args.length === 2) {
        [params, children] = args;
    } else if (args.length === 1) {
        if (Array.isArray(args[0])) {
            [params, children] = [args[0], {}]
        } else {
            [params, children] = [[], args[0]]
        }
    } else {
        [params, children] = [[], {}]
    }

    const routerType = Object.create(RouterType);

    return Object.setPrototypeOf({
        children, params, routerType
    }, routerType)


}

export type AnyRouter = Router<TRouter>;

export type RouterType<T extends AnyRouter> =
    T extends Router<infer U> ? U : never;

export type RouterAt<T extends TRouter, K extends keyof T['children']> =
    Router<T['children'][K] & {
        parent: T
        routerType: T['routerType']
        stack: T['stack'] & Record<K, T['children'][K]>
    }>


export namespace RouterType {


    export function route<T extends TRouter, U extends Record<string, AnyRouter>>(
        this: Router<T>,
        children: U
    ): Router<T & {
        children: { [K in keyof U]: RouterType<U[K]> }
    }> {
        Object.assign(this.children, children)

        return <any>this;
    }


    export function extend<T extends TRouter, U extends object>(
        this: Router<T>,
        type: U
    ): Router<T & { routerType: U }> {

        Object.defineProperties(this.routerType, Object.getOwnPropertyDescriptors(type));

        return <any>this;
    }

    export function at<T extends TRouter, K extends keyof T['children']>(
        this: Router<T>,
        name: string & K
    ): RouterAt<T, K> {

        let child: AnyRouter = defined(this.children[name], () =>
            `No router child at "${name}".`);


        if (child.parent === this) {
            return <any>child
        }

        child = this.children[name] = Router(child.params, child.children)
            .extend(child.routerType)
            .extend(this.routerType)
        child.parent = this;

        return <any>child;
    }

    export function param<T extends TRouter, K extends string, U = string>(
        this: Router<T>,
        name: K
    ): Router<T & {
        params: Record<K, string>
    }> {
        this.params.push(name)
        return <any>this;
    }


    export function apply<T extends TRouter>(this: Router<T>, plugins: ReactRouterPlugin<T>[]): Router<T> {
        for (const plugin of plugins) {
            plugin(this)
        }
        return this;
    }

    export function plugin<T extends TRouter>(
        this: Router<T>,
        callback: ReactRouterPlugin<T>
    ): ReactRouterPlugin<T> {
        return callback;
    }

    export function toString(children: AnyRouter) {
        return `Router(${inspect(this.params)},${inspect(this.children)})`
    }
}

export type ReactRouterPlugin<T extends TRouter> = (router: Router<T>) => void;
Router.prototype = RouterType;
