import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestSession, RequestUser } from "@dabsi/modules/session";
import UacModule from "@dabsi/system/uac";
import { AdminInfoRpc } from "@dabsi/system/admin/common/rpc";

export default RpcResolver(
  AdminInfoRpc,
  {
    aclModule: UacModule,
    session: RequestSession,
    user: RequestUser,
  },
  c => async () => {
    if (!c.user) return { type: "fail" };
    return { type: "success", tokens: [] };
  }
);
