import {AnyReactRouter, ReactRouterRenderer, ReactRouterRenderers} from "./ReactRouter";

export function reactRouterRender<T extends AnyReactRouter>(this: T,
                                                            renderer: ReactRouterRenderer<T>): T {
    ReactRouterRenderers(this).push(<ReactRouterRenderer<any>>renderer);
    return this;
}
