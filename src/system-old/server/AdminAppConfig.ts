import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { AdminApp } from "../common/AdminApp";
import { AclRequest } from "./acl/AclRequest";
import { AclUsersManagerConfig } from "./acl/configs/AclUsersManagerConfig";
import { AclGroupsManagerConfig } from "./acl/configs/AclGroupsManagerConfig";
// import { AclRequestResolver } from "./acl/old/AclRequestResolver";

export const ADMIN_TOKEN = "ADMIN";

export const AdminAppConfig = RpcConfigResolver(
  AdminApp,
  {
    aclReq: AclRequest,
    usersManagerConfig: AclUsersManagerConfig,
    groupsManagerConfig: AclGroupsManagerConfig,
  },
  c => $ => {
    c.aclReq.allow(ADMIN_TOKEN);
    return $({
      usersManager: c.usersManagerConfig,
      groupsManager: c.groupsManagerConfig,
    });
  }
);
