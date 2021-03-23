import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { Session } from "@dabsi/modules/session/entities/Session";
import AclModule from "@dabsi/system/acl";
import { AdminInfoRpc } from "@dabsi/system/admin/common";

export default RpcConfigResolver(
  AdminInfoRpc,
  {
    aclModule: AclModule,
    session: DataRowContext(Session),
  },
  c => async () => {
    console.log("xx");

    const { user } = await c.session.fetch({
      relations: { user: { pick: [] } },
    });

    if (!user) return { type: "fail" };
    return { type: "success", tokens: [] };
  }
);
