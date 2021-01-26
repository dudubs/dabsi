import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import AclModule from "@dabsi/system/acl";
import { AdminInfoRpc } from "@dabsi/system/admin/common";
import { DataRow } from "@dabsi/typedata/row";

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
