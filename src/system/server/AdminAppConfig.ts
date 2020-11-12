import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { AdminApp } from "../common/AdminApp";
import { AclRequest } from "./acl/AclRequest";
// import { AclRequestResolver } from "./acl/old/AclRequestResolver";

export const ADMIN_TOKEN = "ADMIN";

export const AdminAppConfig = RpcConfigResolver(
  AdminApp,
  {
    aclReq: AclRequest,
  },
  c => async $ => {
    c.aclReq.allow(ADMIN_TOKEN);

    return $({});
  }
);

// Content-Manager
