import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { User } from "@dabsi/system/acl/entities/AclUser";
import { AclUserBasicInfoInput } from "@dabsi/system/acl-admin/users/inputs/BasicInfoInput";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Resolver } from "@dabsi/typedi/Resolver";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclUserBasicInfoInput,
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
