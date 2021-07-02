import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { Route, Router } from "@dabsi/typerouter";

@SystemRouter.Route("personal")
export default class AclPersonalRouter extends Router {
  @Route() editProfile!: Router;
}
