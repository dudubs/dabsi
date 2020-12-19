import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "./../../../system/acl/entities/Group";
import { DataRow } from "./../../../typedata/DataRow";
import { RpcConfigResolver } from "./../../../typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclEditGroup.at("users"),
  {
    sources: AclDataSources,
    group: DataRow(Group),
  },
  c => $ => {
    return $({
      searchIn: ["firstName", "lastName", "loginName"],
      source: c.sources.users.addFields({
        isChecked: { $has: { groups: { $is: c.group.$key } } },
      }),
    });
  }
);
