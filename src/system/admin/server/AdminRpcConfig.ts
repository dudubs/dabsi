import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RequestUser } from "@dabsi/modules/session/module";
import { AdminRpc } from "@dabsi/system/admin/common";
import RpcConfigFactoryResolver from "../../../modules/rpc/configFactoryResolver";

export default RpcResolver(
  AdminRpc,
  {
    createConfig: RpcConfigFactoryResolver(AdminRpc, { generate: true }),
    user: RequestUser,
  },
  c => async $ => {
    return $(await c.createConfig());
  }
);

// LoggingUserContext: Resolver<DataRowFetcher)
