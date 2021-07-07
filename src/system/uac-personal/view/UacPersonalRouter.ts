import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { Route, Router } from "@dabsi/typerouter";

@SystemRouter.Route("personal")
export default class UacPersonalRouter extends Router {
  @Route() editProfile!: Router;
}
