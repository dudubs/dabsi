import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclAdminRpc } from "../common/AclAdminRpc";
import AclEditUserConfig from "./AclEditUserConfig";
import AclGroupsManagerConfig from "./AclGroupsManagerConfig";

// RpcConfigMapResolver(AclAdminRpc, {editUser: AclEditUserConfig, ....})
export default RpcConfigResolver(
  AclAdminRpc,
  {
    editUserConfig: AclEditUserConfig,
    groupsManagerConfig: AclGroupsManagerConfig,
  },
  c => $ =>
    $({
      editUser: c.editUserConfig,
      groupsManager: c.groupsManagerConfig,
    })
);
