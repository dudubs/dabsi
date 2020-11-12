import { ReactRouter } from "../../typerouter/ReactRouter";
import { Router } from "../../typerouter/Router";
import { AdminRouter } from "./admin/AdminRouter";

export const SystemRouter = Router().use(ReactRouter).route({
  admin: AdminRouter,
  login: Router(),
});
