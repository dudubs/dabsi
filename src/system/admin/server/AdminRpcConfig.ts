import { AdminRpc } from "@dabsi/system/admin/common";
import SystemRpcConfigResolver from "@dabsi/system/rpc/SystemRpcConfigResolver";
import RequestSession from "@dabsi/system/session/RequestSession";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcError } from "@dabsi/typerpc/Rpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AdminRpc,
  {
    getConfig: SystemRpcConfigResolver.create(AdminRpc),
    session: DataRow(RequestSession),
  },
  c => async $ => {
    const user = c.session.user;
    if (!user) throw new RpcError(`Access denied.`);

    return $(await c.getConfig());
  }
);
