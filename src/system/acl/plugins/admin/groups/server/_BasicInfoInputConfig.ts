import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclAdminGroupBasicInfoInput from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupBasicInfoInput";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver } from "@dabsi/typedi";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";

export default RpcConfigResolver(
  // ./BasicInfo
  AclAdminGroupBasicInfoInput,
  {
    sources: AclDataSources,
    group: Resolver.try(DataRow(Group)),
  },
  c => $ =>
    $({
      groupName: {
        $check: groupName =>
          checkUniqueName(c.sources.groups, "name", groupName, c.group?.name),
        $config: { minLength: 2, required: true },
      },
    })
);

/*



/*/
