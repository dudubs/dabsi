import { entries } from "@dabsi/common/object/entries";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import AclModule from "@dabsi/system/modules/acl";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { AdminInfoRpc, AdminRpc } from "@dabsi/system/modules/admin/common";

export default RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
    session: DataRow(RequestSession),
  },
  c => {
    return async () => {
      if (!c.session.user) return { type: "fail" };
      return { type: "success", tokens: [] };
    };
  }
);
