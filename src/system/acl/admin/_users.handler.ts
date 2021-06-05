import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataContext } from "@dabsi/modules/DbModule";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

export default RpcResolver(ACL_AdminRpc, $ =>
  $
    //
    .with({
      ...DataContext,
      checkUniqueUser: DataUniqueChecker(User),
    })
    .at(["addNewUserForm", "editUser.basicForm"], $ =>
      $
        //
        .configure($ =>
          DataFormResolver($, User, {}, c => $ =>
            $({
              commitConfig: ($, v) => $(v),
            })
          )
        )
        .at("input", $ =>
          $
            //
            .configure(["firstName", "lastName"], [], c => $ =>
              $({
                minLength: 2,
              })
            )
            .configure("loginName", [
              c => $ =>
                $({
                  config: { minLength: 5 },
                  [inputBaseConfig]: {
                    check: value =>
                      c.checkUniqueUser({
                        loginName: value,
                      }),
                  },
                }),
            ])
        )
    )
    .configure("usersTable", [
      c => $ =>
        $({
          source: c.getSource(User),
        }),
    ])
    .at("editUser", $ =>
      $
        //
        .configure($ => DataParameterResolver($, User))
        .at("contactForm", $ =>
          $
            //
            .configure($ =>
              DataFormResolver($, User, {}, c => $ =>
                $({
                  commitConfig: ($, v) => $(v),
                })
              )
            )
            .configure("input.email", [
              c => $ =>
                $({
                  config: {
                    // TODO: pattern
                  },
                  [inputBaseConfig]: {
                    check: email => c.checkUniqueUser({ email }),
                  },
                }),
            ])
        )
    )
);
