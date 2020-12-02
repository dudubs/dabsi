import { AclUsersManagerConfig } from "../../../system-old/server/acl/configs/AclUsersManagerConfig";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common";

export const AclAdminConfig = RpcConfigResolver(
  AclAdminRpc,
  {
    usersConfig: AclUsersManagerConfig,
  },
  c => $ =>
    $({
      users: c.usersConfig,
    })
);
