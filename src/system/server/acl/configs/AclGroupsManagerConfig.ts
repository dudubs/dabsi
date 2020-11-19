import { DataResolvers } from "../../../../typedata/DataResolvers";
import { RpcConfigResolver } from "../../../../typerpc/RpcConfigResolver";
import { AclGroupsManager } from "../../../common/AclGroupsManager";
import { checkUniqueName } from "../checkUniqueName";
import { Group } from "../Group";
import { User } from "../User";

export const AclGroupsManagerConfig = RpcConfigResolver(
  AclGroupsManager,
  {
    ...DataResolvers({
      users: User,
      groups: Group,
    }),
  },
  c => $ => {
    return $({
      getTitleForRow: group => group.name,
      source: c.groups,
      tableColumnsConfig: {
        groupName: "name",
      },
      addInputConfig: {
        groupName: { $check: name => checkUniqueName(c.groups, "name", name) },
      },
      editValueConfigForRow: ($, row) =>
        $({
          groupName: row.name,
        }),
      editInputConfigForRow: ($, row) => {
        return $({
          groupName: {
            $check: name => checkUniqueName(c.groups, "name", name, row.name),
          },
        });
      },
      addSubmit({ groupName: name }) {
        return c.groups.insertKey({
          name,
        });
      },
      async editSubmit(row, { groupName: name }) {
        await row.update({ name });
      },
    });
  }
);
