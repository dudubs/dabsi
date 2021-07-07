import { RowKeyParameterResolver } from "@dabsi/modules/data/DataContext";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RequestUser } from "@dabsi/modules/session";
import UacPersonalRpc from "@dabsi/system/uac-personal/common/UacPersonalRpc";
import { User } from "@dabsi/system/uac/entities/User";
import { Resolver } from "@dabsi/typedi";

export default RpcResolverBuilder({
  for: UacPersonalRpc,

  provide: {
    ...RowKeyParameterResolver(
      User,
      Resolver([RequestUser], user => user.$key!)
    ),
  },

  // Resolver.Provider()
  let: $ => {
    $({
      at: "basicInfoForm",
    });
  },
});
