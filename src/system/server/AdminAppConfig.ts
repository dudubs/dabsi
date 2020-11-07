import { Consumer } from "../../typedi/Consumer";
import { RpcConfig } from "../../typerpc/Rpc";
import { AdminApp } from "../common/AdminApp";
// import { AclRequestResolver } from "./acl/old/AclRequestResolver";
import { GetDataSourceResolver } from "./SystemContextResolver";

export const ADMIN_PERMISSION = "ADMIN";

export const AdminAppConfig = Consumer([GetDataSourceResolver], getDataSource =>
  RpcConfig(AdminApp, async $ => {
    // aclReq.permission(ADMIN_PERMISSION);

    return $({});
  })
);
