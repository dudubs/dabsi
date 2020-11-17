import { Router } from "../../../typerouter/Router";
import { AclUsersManagerRouter } from "../AclUsersManager";

export const AdminRouter = Router({
  acl: Router({
    users: AclUsersManagerRouter,
  }),
});
