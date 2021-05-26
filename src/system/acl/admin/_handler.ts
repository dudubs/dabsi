import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc, {
  ACL_GroupInput,
} from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { inputConfig } from "@dabsi/typerpc2/input/InputHandler";

const context = { getSource: DataSourceFactory2 } as const;

export default [
  RpcResolver(ACL_GroupInput, {
    groupName: $ =>
      RpcResolver($, [DataUniqueChecker(Group)], check => $ =>
        $({
          config: { minLength: 2 },
          [inputConfig]: {
            check: v => {
              console.log({ check: v });
              return check({ name: v });
            },
          },
        })
      ),
  }),
  RpcResolver(ACL_AdminRpc, {
    addNewGroupForm: $ =>
      DataFormResolver($, Group, [], c => $ =>
        $({
          commitConfig: ($, { groupName }) => {
            console.log({ groupName });
            return $({ name: groupName });
          },
        })
      ),

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
