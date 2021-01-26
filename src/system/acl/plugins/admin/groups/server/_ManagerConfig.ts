import { RpcConfigResolver } from "@dabsi/modules/rpc/RpcConfigResolver";
import AclDataSources from "@dabsi/system/acl/AclDataSources";
import { Group } from "@dabsi/system/acl/entities/Group";
import AclAdminGroupsManager from "@dabsi/system/acl/plugins/admin/groups/common/AclAdminGroupsManager";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/RpcConfigFactoryResolver";

// TODO: DataManagerConfigResolver(EntityType, ...)
export default RpcConfigResolver(
  AclAdminGroupsManager,
  {
    createEditConfig: RpcConfigFactoryResolver(
      AclAdminGroupsManager.at("edit").at("target"),
      {
        context: Group.provide(),
      }
    ),
    createAddInputConfig: RpcConfigFactoryResolver(
      AclAdminGroupsManager.at("add").at("input")
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
        $(c.createEditConfig(DataRow(Group).provide(() => group))),

      addInputConfig: c.createAddInputConfig(),
      addSubmit({ groupName }) {
        return c.sources.groups.insertKey({ name: groupName });
      },
    })
);
