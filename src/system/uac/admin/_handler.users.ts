import { pick } from "@dabsi/common/object/pick";
import DataContext from "@dabsi/modules/data/DataContext";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import UacAdminRpc from "@dabsi/system/uac/admin/common/UacRpc";
import { User } from "@dabsi/system/uac/entities/User";

export default RpcResolverBuilder({
  for: UacAdminRpc,
  with: { data: DataContext },
  let: $ => {
    $({
      at: "editUser",

      resolve: $ => DataParameterResolver($, User),

      let: $ => {
        $({
          at: "getBasicInfo",
          configure: c => $ =>
            $(async () => {
              const fields = ["loginName", "firstName", "lastName"] as const;
              return pick(await c.data.getParameter(User).pick(fields), fields);
            }),
        });

        $({
          at: "updateGroups",
          configure: c => $ =>
            $(async groups => {
              await c.data //
                .getParameter(User)
                .at("groups")
                .updateRelations(groups);
            }),
        });
      },
    });
  },
});
