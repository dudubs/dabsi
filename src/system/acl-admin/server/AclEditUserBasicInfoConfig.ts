import { User } from "./../../../system-old/server/acl/User";
import { DataRow } from "./../../../typedata/DataRow";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclEditBasicUserInfo } from "../common/AclAdminRpc";

export default RpcConfigResolver(
  AclEditBasicUserInfo,
  {
    user: DataRow(User),
  },
  c => $ => $({ submit() {} })
);
