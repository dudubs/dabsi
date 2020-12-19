import { Column } from "typeorm";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclEditGroup from "@dabsi/system/acl-admin/groups/AclEditGroup";
import AclGroupsManager from "@dabsi/system/acl-admin/groups/AclGroupsManager";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import SystemRpcConfigResolver from "@dabsi/system/core/SystemRpcConfigResolver";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclGroupsManager,
  {
    getEditConfig: SystemRpcConfigResolver(AclEditGroup, {
      ...Group.provide(),
    }),
    createAddInputConfig: SystemRpcConfigResolver(
      AclGroupsManager.at("add").at("input")
    ),
    sources: AclDataSources,
  },
  c => $ =>
    $({
      source: c.sources.groups,

      tableConfig: {
        columns: { groupName: "name" },
      },
      editConfigFactory: ($, group) =>
        $(c.getEditConfig(Group.provide(() => group))),
      addInputConfig: c.createAddInputConfig(),
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
