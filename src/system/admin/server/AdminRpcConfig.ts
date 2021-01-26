import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RequestSession from "@dabsi/modules/session/RequestSession";
import { AdminRpc } from "@dabsi/system/admin/common";
import { DataRow } from "@dabsi/typedata/row";
import { RpcError } from "@dabsi/typerpc/Rpc";
import RpcConfigFactoryResolver from "../../../modules/rpc/RpcConfigFactoryResolver";

export default RpcConfigResolver(
  AdminRpc,
  {
    // TODO: Automatic by cycle
    createConfig: RpcConfigFactoryResolver(AdminRpc, { create: true }),
    session: DataRow(RequestSession),
  },
  c => async $ => {
    const user = c.session.user;
    if (!user) throw new RpcError(`Access denied.`);

    return $(await c.createConfig());
  }
);
