import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataContext } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc, {
  ACL_GroupInput,
} from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

export default [
  RpcResolver(ACL_GroupInput, [
    {
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
  ]),
  RpcResolver(ACL_AdminRpc, [
    {
      editGroupForm: $ => DataParameterResolver($, Group),
      deleteGroup: $ =>
        RpcResolver($, DataContext, c => $ =>
          $(async key => {
            await c.getSource(Group).delete(key);
          })
        ),
      groupsTable: $ =>
        RpcResolver($, DataContext, c => $ =>
          $({
            source: c.getSource(Group).pick([]),
            columns: {
              groupName: { field: "name" },
              countUsers: { field: { $count: "users" } },
            },
          })
        ),
    },
    $ => [
      // editGroupForm!, addNewGroupForm
      $.at2(["editGroupForm!", "addNewGroupForm"], $ => [
        DataFormResolver($, Group, {}, c => $ =>
          $({
            valueConfig: ($, row) => $({ groupName: row.name }),
            commitConfig: ($, value) => $({ name: value.groupName }),
          })
        ),
      ]),
    ],
  ]),
];
