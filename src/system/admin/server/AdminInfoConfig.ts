import { entries } from "@dabsi/common/object/entries";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";
import AclModule from "@dabsi/system/acl";
import { SystemSession } from "@dabsi/system/session/SystemSession";
import { AdminInfoRpc, AdminRpc } from "@dabsi/system/admin/common";

export default RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
    session: DataRow(SystemSession),
  },
  c => {
    return async () => {
      if (!c.session.user) return { type: "fail" };
      return { type: "success", tokens: [] };
    };
  }
);
