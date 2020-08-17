import {RouterInstanceType} from "../instance";
import {AnyRouter, Router} from "../Router";
import {RouterParams} from "../routerParam";
import {locationAt} from "./locationAt";
import {routerExtendLocation} from "./routerExtendLocation";


declare module "../Router" {
    interface Router {
        locationType: {
            at: typeof locationAt
        };
        extendLocation: typeof routerExtendLocation;
    }
}
Router.locationType = {at: locationAt};
Router.extendLocation = routerExtendLocation;


export type RouterLocation<Router extends AnyRouter> =
    & Router['locationType']
    & {
    router: Router,
    params: RouterParams<Router>
    instance: Router['instanceType'];
}


export type RouterLocationProps<T extends AnyRouter> = {
    params: RouterParams<T>,
    instance: RouterInstanceType<T>
};

