import {Route} from "../../router";
import {AnyReactRoute, AnyReactRouter} from "./ReactRouter";

export class ReactRouterLocation {

    constructor(
        public route: AnyReactRoute,
        public path: string
    ) {
    }
}
