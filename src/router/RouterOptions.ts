import {AnyRouter, Router, RouterWithRouterType} from "./Router";

declare module "./Router" {
    interface RouterInit {
        options: object;
    }

    interface DefaultRouterInit {
        options: {}
    }

    interface Router<Init> {
        options: Init['options'];

        config: typeof _config;
        configure: typeof _configure;
    }
}

Router.options = {};
Router.config = _config;
Router.configure = _configure;


export type RouterWithOptions<O extends object> =
    { options: O } & RouterWithRouterType<{ options: O }>;


export function _config<T extends AnyRouter, O extends object>(this: T, defaultOptions: O): T & RouterWithOptions<O> {

    this.options = {...this.options, ...defaultOptions}

    return this.extend({
        options: this.options
    });
}


export function _configure<T extends AnyRouter & { options },K extends keyof T['options']>(
    this: T,
    options: Pick<T['options'],K>
): T {
    this.options = {...this.options, ...options};
    return this;
}
