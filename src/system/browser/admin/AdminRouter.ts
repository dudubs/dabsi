import { ReactRouter } from "../../../typerouter/ReactRouter";
import { Router } from "../../../typerouter/Router";
import { DataManagerRouter } from "../../../typerpc/data-manager/DataManagerRouter";
import { AclUsersManager } from "../../server/acl/AclUsersManaager";

export const AdminRouter = Router()
  .use(ReactRouter)
  .route({
    acl: DataManagerRouter(AclUsersManager),
  });
