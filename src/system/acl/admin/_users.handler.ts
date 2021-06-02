import { pick } from "@dabsi/common/object/pick";
import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataContext } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc, {
  ACL_GroupInput,
} from "@dabsi/system/acl/admin/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

const UserContext = { checkUniqueUser: DataUniqueChecker(User) };
export default [
  RpcResolver(ACL_AdminRpc, {
    addNewUserForm: [
      $ =>
        DataFormResolver($.rpcType, User, {}, c => $ =>
          $({
            commitConfig: ($, v) => $(v),
          })
        ),
      {
        input: {
          $anchor: {
            loginName: $ =>
              RpcResolver($, UserContext, c => $ =>
                $({
                  [inputBaseConfig]: {
                    check: value =>
                      c.checkUniqueUser({
                        loginName: value,
                      }),
                  },
                })
              ),
          },
        },
      },
    ],
    usersTable: $ =>
      RpcResolver($, DataContext, c => $ =>
        $({
          source: c.getSource(User),
        })
      ),

    editUser: [
      $ => DataParameterResolver($, User),
      {
        $anchor: {
          contactForm: [
            $ =>
              DataFormResolver($.rpcType, User, {}, c => $ =>
                $({
                  commitConfig: ($, v) => $(v),
                })
              ),
            {
              input: {
                $anchor: {
                  email: $ => RpcResolver($, UserContext, c => $ => $({})),
                },
              },
            },
          ],
        },
      },
    ],
  }),
];
