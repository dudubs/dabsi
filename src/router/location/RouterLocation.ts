import {UndefinedIfNoKeys} from "../../common/typings";
import {AnyRouter, Router, UndefinedRouterParams} from "../Router";
import {RouterInstanceOf} from "../instance";
import {at} from "./at";
import {extendLocation} from "./extendLocation";


declare module "../Router" {
    interface Router {
        locationType: { at: typeof at; };
        extendLocation: typeof extendLocation;
    }
}
declare module "../at" {
    interface IRouterAt<T> {
        locationType: T['locationType'];
    }
}


export type RouterLocation<T extends AnyRouter> = T['locationType'] & T['instanceType'] & {
    at: typeof at;
    router: T,
    params: UndefinedRouterParams<T>
    instance: RouterInstanceOf<T>;
}


export type RouterLocationProps<T extends AnyRouter> = {
    params: UndefinedRouterParams<T>,
    instance: UndefinedIfNoKeys<RouterInstanceOf<T>>
};


Router.extendLocation = extendLocation;
Router.locationType = {at: at};

