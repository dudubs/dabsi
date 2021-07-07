import DataContext from "@dabsi/modules/data/DataContext";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import UacAdminRpc from "@dabsi/system/uac/admin/common/UacRpc";
import { Group } from "@dabsi/system/uac/entities/Group";

export default RpcResolverBuilder({
  for: UacAdminRpc,
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
