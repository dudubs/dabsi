import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { RequestUser } from "@dabsi/modules/session";
import { AdminRpc } from "@dabsi/system/admin/common";
import RpcConfigFactoryResolver from "../../../modules/rpc/configFactoryResolver";

export default RpcConfigResolver(
  AdminRpc,
  {
    // TODO: Automatic by cycle
    createConfig: RpcConfigFactoryResolver(AdminRpc, { create: true }),
    user: RequestUser,
  },
  c => async $ => {
    return $(await c.createConfig());
  }
);

// LoggingUserContext: Resolver<DataRowFetcher)
