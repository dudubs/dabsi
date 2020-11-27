import { entries } from "../../../common/object/entries";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclModule } from "../../acl/AclModule";
import { AdminInfoRpc, AdminRpc } from "../common";

export const AdminInfoConfig = RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
  },
  c => {
    return async () => {
      // c.aclModule.sources.permissions;
      return [];
    };
  }
);
