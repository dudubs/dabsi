import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { checkUniqueName } from "@dabsi/system-old/server/acl/checkUniqueName";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { AclAdminGroupBasicInfoInput } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoInput";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver } from "@dabsi/typedi";
export default RpcConfigResolver(
  // ./BasicInfo
  AclAdminGroupBasicInfoInput,
  {
    acl: AclContext,
    group: Resolver.try(DataRow(Group)),
  },
  c => $ =>
    $({
      groupName: {
        $check: groupName =>
          checkUniqueName(c.acl.groups, "name", groupName, c.group?.name),
        $config: { minLength: 2, required: true },
      },
    })
);

/*



/*/
