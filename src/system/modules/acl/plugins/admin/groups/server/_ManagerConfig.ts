import AclGroupsManager from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupsManager";
import AclDataSources from "@dabsi/system/modules/acl/AclDataSources";
import { Group } from "@dabsi/system/modules/acl/entities/Group";
import OldSystemRpcConfigXResolver from "@dabsi/modules/rpc/OldSystemRpcConfigXResolver";
import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import RpcConfigFactory from "../../../../../../../modules/rpc/RpcConfigFactory";

export default RpcConfigResolver(
  AclGroupsManager,
  {
    createEditConfig: RpcConfigFactory(
      AclGroupsManager.at("edit").at("target"),
      {
        context: Group.provide(),
      }
    ),
    createAddInputConfig: RpcConfigFactory(
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
        $(c.createEditConfig(Group.provide(() => group))),

      addInputConfig: c.createAddInputConfig(),
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
