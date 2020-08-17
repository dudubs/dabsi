import {AnyRouter} from "./Router";

declare module "./Router" {
    interface Router {
        class: typeof routerClass;
    }
}

export function routerClass<T extends AnyRouter>(
    this: T
): { new(): T } {
    const router = this;

    return <any>RouterClass;

    function RouterClass() {
        return Object.setPrototypeOf({...router}, router.routerType)
    }
}
