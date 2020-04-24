import {Route} from "../../router";
import {AnyReactRouter} from "./ReactRouter";

export class ReactRouterLocation {

    constructor(
        public route: Route<AnyReactRouter>,
        public path: string
    ) {
    }
}
