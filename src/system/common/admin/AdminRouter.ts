import { Router } from "../../../typerouter/Router";
import { AclGroupsManagerRouter } from "../AclGroupsManager";
import { AclUsersManagerRouter } from "../AclUsersManager";

export const AdminRouter = Router({
  acl: Router({
    users: AclUsersManagerRouter,
    groups: AclGroupsManagerRouter,
  }),
});
