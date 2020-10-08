import { Route } from "../../router";
import { AnyReactRoute, AnyReactRouterOld } from "./OldReactRouter";

export class ReactRouterLocationOld {
  constructor(public route: AnyReactRoute, public path: string) {}
}
