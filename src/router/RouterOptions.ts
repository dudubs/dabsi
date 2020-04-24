import {AnyRouter, ExtendRouter, Router} from "./Router";

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

export type RouterWithOptions<T extends AnyRouter, O extends object> = ExtendRouter<T, {
    options: O;
    configure: typeof _configure;
}>;

export function _config<T extends AnyRouter>(this: T):
    <O extends object>() => RouterWithOptions<T, O> {
    return (): any => this;
}


export function _configure<T extends AnyRouter & { options }>(
    this: T,
    options: T['options']
): T {
    this.options = {...this.options, ...options};
    return this;
}
