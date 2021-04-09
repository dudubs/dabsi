import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { RequestSession, RequestUser } from "@dabsi/modules/session/module";
import AclModule from "@dabsi/system/acl";
import { AdminInfoRpc } from "@dabsi/system/admin/common";

export default RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
    session: RequestSession,
    user: RequestUser,
  },
  c => async () => {
    if (!c.user) return { type: "fail" };
    return { type: "success", tokens: [] };
  }
);
