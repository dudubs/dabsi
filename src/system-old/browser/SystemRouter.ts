import { Router } from "../../typerouter/Router";
import { AdminRouter } from "../common/admin/AdminRouter";

export const SystemRouter = Router({
  admin: AdminRouter,
  login: Router(),
});
