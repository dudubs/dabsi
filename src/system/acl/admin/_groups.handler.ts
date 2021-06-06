import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataContext } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

export default RpcResolver(ACL_AdminRpc, $ =>
  $
    //
    .with({ ...DataContext, checkUniqueGroup: DataUniqueChecker(Group) })
    .at("editGroupForm", $ => $.resolve($ => DataParameterResolver($, Group)))
    .at("deleteGroup", $ =>
      $.configure(c => $ =>
        $(async key => {
          await c.getSource(Group).delete(key);
        })
      )
    )
    .at("groupsTable", $ =>
      $.configure(c => $ =>
        $({
          source: c.getSource(Group),
          columns: {
            groupName: { field: "name" },
            countUsers: { field: { $count: "users" } },
          },
        })
      )
    )
    .at(["addNewGroupForm", "editGroupForm!"], $ =>
      $
        //
        .resolve($ => DataFormResolver($, Group))
        .at("input.groupName", $ =>
          $.configure(c => $ =>
            $({
              config: { minLength: 4, titleCase: true },
              [inputBaseConfig]: {
                check: name => c.checkUniqueGroup({ name }),
              },
            })
          )
        )
    )
);
