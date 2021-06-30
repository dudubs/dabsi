import { RowKeyParameterResolver } from "@dabsi/modules/data/DataContext";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RequestUser } from "@dabsi/modules/session";
import AclPersonalRpc from "@dabsi/system/acl-personal/common/AclPersonalRpc";
import { User } from "@dabsi/system/acl/entities/User";
import { Resolver } from "@dabsi/typedi";

export default RpcResolverBuilder({
  for: AclPersonalRpc,

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
