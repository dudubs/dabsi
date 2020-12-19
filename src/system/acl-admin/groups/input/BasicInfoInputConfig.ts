import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { Group } from "@dabsi/system-old/server/acl/Group";
import { AclGroupBasicInfoInput } from "@dabsi/system/acl-admin/groups/input/BasicInfoInput";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Resolver } from "@dabsi/typedi/Resolver";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  // ./BasicInfo
  AclGroupBasicInfoInput,
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