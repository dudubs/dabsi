import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { AclContext } from "@dabsi/system/acl/context";
import { Group } from "@dabsi/system/acl/entities/Group";
import { AclAdminGroupsManager } from "@dabsi/system/acl/plugins/admin/groups/common/manager";
import { DataRow } from "@dabsi/typedata/row";
import RpcConfigFactoryResolver from "../../../../../../modules/rpc/configFactoryResolver";

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
    acl: AclContext,
  },
  c => $ =>
    $({
      source: c.acl.groups,

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
        return c.acl.groups.insertKey({ name: groupName });
      },
    })
);
