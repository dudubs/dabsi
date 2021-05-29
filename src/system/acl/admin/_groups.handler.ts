import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

const context = { getSource: DataSourceFactory2 } as const;

export default [
  RpcResolver(ACL_AdminRpc, {
    editGroupForm: $ => DataParameterResolver($, Group),
    addNewGroupForm: [
      $ =>
        DataFormResolver($.rpcType, Group, {}, c => $ =>
          $({
            valueConfig: ($, v) => $({ groupName: v.name }),
            commitConfig: ($, { groupName }) => $({ name: groupName }),
          })
        ),
      {
        input: {
          groupName: $ =>
            RpcResolver(
              $.rpcType,
              { checkUniqueGroup: DataUniqueChecker(Group) },
              c => $ =>
                $({
                  config: { minLength: 2, titleCase: true },
                  [inputBaseConfig]: {
                    check: v => c.checkUniqueGroup({ name: v }),
                  },
                })
            ),
        },
      },
    ],
    groupsTable: $ =>
      RpcResolver($, context, c => $ =>
        $({
          source: c.getSource(Group).pick([]),
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        })
      ),
  }),
];
