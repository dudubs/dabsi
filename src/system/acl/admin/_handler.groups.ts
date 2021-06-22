import DataContext from "@dabsi/modules/data/DataContext";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import AclAdminRpc from "@dabsi/system/acl/admin/common/AclRpc";
import { Group } from "@dabsi/system/acl/entities/Group";

export default RpcResolverBuilder({
  for: AclAdminRpc,
  with: { data: DataContext },
  let: $ => {
    $({
      at: "editGroup",
      resolve: $ => DataParameterResolver($, Group),
      let: $ => {
        $({
          at: "updateUsers",
          configure: c => $ =>
            $(async users => {
              await c.data //
                .getParameter(Group)
                .at("users")
                .updateRelations(users);
            }),
        });
      },
    });

    $({
      at: "deleteGroup",
      configure: c => $ =>
        $(async key => {
          await c.data.getSource(Group).delete(key);
        }),
    });
  },
});
