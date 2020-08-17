import {AnyRouter, Router, RouterWithRouterType} from "./Router";

// TODO: use symbols


declare module "./Router" {
    interface RouterProps {
        options: any;
    }

    interface Router {
        options: {};
        config: typeof routerConfig;
        configure: typeof routerConfigure;
    }
}


Router.options = {};
Router.config = routerConfig;
Router.configure = routerConfigure;

export type RouterWithOptions<O extends object> =
    { options: O } & RouterWithRouterType<{ options: O }>;


export function routerConfig<T extends AnyRouter, O extends object>(this: T, defaultOptions: O):
    T & RouterWithOptions<O> {

    this.options = {...this.options, ...defaultOptions}

    return <any>this.extend({
        options: this.options
    });
}


export function routerConfigure<T extends AnyRouter , K extends keyof T['options']>(
    this: T,
    options: Pick<T['options'], K>
): T {
    this.options = {...this.options, ...options};
    return this;
}
