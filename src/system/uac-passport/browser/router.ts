import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { Route, Router } from "@dabsi/typerouter";

@SystemRouter.Route("auth")
export default class AclPassportRouter extends Router {
  @Route()
  callback!: Router;
}
