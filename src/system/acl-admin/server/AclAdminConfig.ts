import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";
import { AclEditUserConfig } from "./AclEditUserConfig";

export const AclAdminConfig = RpcConfigResolver(
  AclAdminRpc,
  {
    editUserConfig: AclEditUserConfig,
  },
  c => $ =>
    $({
      editUser: c.editUserConfig,
    })
);
