import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { User } from "@dabsi/system/acl/entities/User";
import AclAdminUserBasicInfoInput from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoInput";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Resolver } from "@dabsi/typedi";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclAdminUserBasicInfoInput,
  {
    sources: AclDataSources,
    user: Resolver.try(DataRow(User)),
  },
  c => $ =>
    $({
      firstName: { maxLength: 15, minLength: 2 },
      lastName: { maxLength: 15, minLength: 2 },
      loginName: {
        $check: loginName =>
          checkUniqueName(
            c.sources.groups,
            "name",
            loginName,
            c.user?.loginName
          ),
        $config: { minLength: 5, maxLength: 20, required: true },
      },
    })
);
