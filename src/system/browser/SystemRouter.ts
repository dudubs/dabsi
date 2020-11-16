import { Router } from "../../typerouter2/Router";
import { AdminRouter } from "../common/admin/AdminRouter";

export const SystemRouter = Router({
  admin: AdminRouter,
  login: Router(),
});
