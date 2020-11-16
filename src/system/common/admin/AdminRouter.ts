import { Router } from "../../../typerouter2/Router";
import { AclUsersManagerRouter } from "../AclUsersManager";

export const AdminRouter = Router({
  acl: Router({
    users: AclUsersManagerRouter,
  }),
});
