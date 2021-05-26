import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc, {
  ACL_GroupInput,
} from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";

const context = { getSource: DataSourceFactory2 } as const;

export default [
  RpcResolver(ACL_AdminRpc, {
    addNewGroupForm: $ => DataFormResolver($, Group),

    groupsTable: $ =>
      RpcResolver($, context, c => $ =>
        $({
          source: c.getSource(Group),
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        })
      ),
  }),

  RpcResolver(ACL_AdminRpc, {
    groupsTable: $ =>
      RpcResolver($, context, c => $ =>
        $({
          source: c.getSource(Group),
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        })
      ),
  }),
];
