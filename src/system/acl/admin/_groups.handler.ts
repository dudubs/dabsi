import DataContext from "@dabsi/modules/data/DataContext";
import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { Group } from "@dabsi/system/acl/entities/Group";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

export default RpcResolver(ACL_AdminRpc, $ =>
  $.with({ data: DataContext })
    .at("editGroup", $ =>
      $
        //
        .resolve($ => DataParameterResolver($, Group))
        .at("updateUsers", $ =>
          $.configure(c => $ =>
            $(async users => {
              await c.data //
                .getParameter(Group)
                .at("users")
                .updateRelations(users);
            })
          )
        )
    )
    .at("deleteGroup", $ =>
      $.configure(c => $ =>
        $(async key => {
          await c.data.getSource(Group).delete(key);
        })
      )
    )
    .at(["addNewGroupForm", "editGroup.form"], $ =>
      $
        //
        .resolve($ =>
          DataFormResolver($, Group, {}, c => $ =>
            $({
              valueConfig: ($, row) =>
                $({
                  groupName: row.name,
                }),
              commitConfig: ($, value) =>
                $({
                  name: value.groupName,
                }),
            })
          )
        )
        .at("input.groupName", $ =>
          $.configure(c => $ =>
            $({
              config: { minLength: 4, titleCase: true },
              [inputBaseConfig]: {
                check: name => c.data.checkUnique(Group, { name }),
              },
            })
          )
        )
    )
);
