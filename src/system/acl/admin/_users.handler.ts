import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DataParameterResolver } from "@dabsi/modules/data/DataParameterResolver";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import AclAdminContext from "@dabsi/system/acl/admin/AclAdminContext";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { User } from "@dabsi/system/acl/entities/User";
import { inputBaseConfig } from "@dabsi/typerpc2/input/InputHandler";

export default RpcResolver(ACL_AdminRpc, $ =>
  $
    //
    .with(AclAdminContext)
    .at(["addNewUserForm", "editUser.basicForm"], $ =>
      $
        //
        .resolve($ =>
          DataFormResolver($, User, {}, c => $ =>
            $({
              commitConfig: ($, v) => $(v),
            })
          )
        )
        .at("input", $ =>
          $
            //
            .at(["firstName", "lastName"], $ =>
              $.configure(c => $ =>
                $({
                  minLength: 2,
                })
              )
            )
            .at("loginName", $ =>
              $.configure(c => $ =>
                $({
                  config: { minLength: 5 },
                  [inputBaseConfig]: {
                    check: value =>
                      c.checkUniqueUser({
                        loginName: value,
                      }),
                  },
                })
              )
            )
            .at("loginName", $ =>
              $.configure(c => $ =>
                $({
                  config: { minLength: 5 },
                  [inputBaseConfig]: {
                    check: value =>
                      c.checkUniqueUser({
                        loginName: value,
                      }),
                  },
                })
              )
            )
        )
    )
    // at usersTable, editGroup.users
    .at(["usersTable"], $ =>
      $.configure(c => $ =>
        $({
          source: c.getSource(User),
        })
      )
    )
    .at("editUser", $ =>
      $
        //
        .resolve($ => DataParameterResolver($, User))
        .at("contactForm", $ =>
          $
            //
            .resolve($ =>
              DataFormResolver($, User, {}, c => $ =>
                $({
                  commitConfig: ($, v) => $(v),
                })
              )
            )
            .at("input.email", $ =>
              $.configure(c => $ =>
                $({
                  config: {
                    // TODO: pattern
                  },
                  [inputBaseConfig]: {
                    check: email => c.checkUniqueUser({ email }),
                  },
                })
              )
            )
        )
    )
);
