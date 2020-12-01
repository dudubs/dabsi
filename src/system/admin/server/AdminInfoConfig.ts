import { entries } from "../../../common/object/entries";
import { DataRow } from "../../../typedata/DataRow";
import { RpcConfigResolver } from "../../../typerpc/RpcConfigResolver";
import { AclModule } from "../../acl/AclModule";
import { SystemSession } from "../../core/SystemSession";
import { AdminInfoRpc, AdminRpc } from "../common";

export const AdminInfoConfig = RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
    session: DataRow(SystemSession),
  },
  c => {
    return async () => {
      if (!c.session.user) return { type: "fail" };
      console.log(c.session);
      // c.aclModule.sources.permissions;
      return { type: "success", tokens: [] };
    };
  }
);
