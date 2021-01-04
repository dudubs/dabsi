import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { AdminRpc } from "@dabsi/system/modules/admin/common";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcError } from "@dabsi/typerpc/Rpc";
import RpcConfigFactory from "../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AdminRpc,
  {
    // TODO: Automatic by cycle
    createConfig: RpcConfigFactory(AdminRpc, { create: true }),
    session: DataRow(RequestSession),
  },
  c => async $ => {
    const user = c.session.user;
    if (!user) throw new RpcError(`Access denied.`);

    return $(await c.createConfig());
  }
);
