import AclGroupsManager from "@dabsi/system/acl/plugins/admin/groups/common/AclGroupsManager";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import SystemRpcConfigResolver from "@dabsi/system/rpc/SystemRpcConfigResolver";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  AclGroupsManager,
  {
    getEditConfig: SystemRpcConfigResolver(
      AclGroupsManager.at("edit").at("target"),
      {
        ...Group.provide(),
      }
    ),
    getAddInputConfig: SystemRpcConfigResolver(
      AclGroupsManager.at("add").at("input")
    ),
    sources: AclDataSources,
  },
  c => $ =>
    $({
      source: c.sources.groups,

      tableConfig: {
        columns: {
          groupName: "name",
          countUsers: {
            load: { $count: "users" },
          },
        },
      },
      editConfigFactory: ($, group) =>
        $(c.getEditConfig(Group.provide(() => group))),

      addInputConfig: c.getAddInputConfig(),
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
