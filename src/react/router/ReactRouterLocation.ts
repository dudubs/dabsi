import {Route} from "../../router";
import {AnyReactRoute, AnyReactRouter} from "./OldReactRouter";

export class ReactRouterLocationOld {

    constructor(
        public route: AnyReactRoute,
        public path: string
    ) {
    }
}
