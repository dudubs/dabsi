import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import AclModule from "@dabsi/system/modules/acl";
import { AdminInfoRpc } from "@dabsi/system/modules/admin/common";
import { DataRow } from "@dabsi/typedata/DataRow";

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
