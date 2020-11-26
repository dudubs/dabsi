import { inspect } from "../../../../logging/inspect";
import { DataResolvers } from "../../../../typedata/DataResolvers";
import { RpcConfigResolver } from "../../../../typerpc/RpcConfigResolver";
import { AclUsersManager } from "../../../common/AclUsersManager";
import { checkUniqueName } from "../checkUniqueName";
import { Group } from "../Group";
import { User } from "../User";

export const AclUsersManagerConfig = RpcConfigResolver(
  AclUsersManager,
  {
    ...DataResolvers({
      users: User,
      groups: Group,
    }),
  },
  c => $ => {
    return $({
      source: c.users,
      //
      getTitleForRow: row => `${row.firstName} ${row.lastName}`,

      getTabsConfigForRow: ($, user) =>
        $({
          groups: {
            inputConfig: $ =>
              $({
                columns: { label: "name" },
                getTargetValue: row => row.isGroupOfUser,
                source: c.groups.pick(["name"], {
                  isGroupOfUser: { $has: { users: { $is: user.$key } } },
                }),
              }),
            async submit(value) {
              await user.at("groups").updateRelations(value);
              return null;
            },
          },
        }),

      addInputConfig: {
        loginName: {
          $check: loginName =>
            checkUniqueName(
              //
              c.users,
              "loginName",
              loginName
            ),
        },
      },

      editInputConfigForRow: ($, row) =>
        $({
          basicInfo: {
            loginName: {
              $check: loginName =>
                checkUniqueName(
                  c.users,
                  "loginName",
                  loginName, //
                  row.loginName
                ),
            },
          },
        }),

      editValueConfigForRow: ($, row) =>
        $({
          basicInfo: row,
          contactInfo: row,
        }),

      addSubmit({ loginName, ...basicInfo }) {
        return c.users.insertKey(basicInfo);
      },
      async editSubmit(row, { basicInfo, contactInfo }) {
        console.log(inspect(basicInfo));
        await row.update({
          ...basicInfo,
          ...contactInfo,
        });
      },
    });
  }
);
