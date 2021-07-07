import DataForm from "@dabsi/modules/data/common/DataForm";
import DataContext from "@dabsi/modules/data/DataContext";
import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import {
  UacGroupForm,
  UacUserBasicForm,
  UacUserContactForm,
} from "@dabsi/system/uac/admin/common/UacRpc";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";
import { inputBaseConfig } from "@dabsi/typerpc/input/InputHandler";

export default RpcResolverBuilder({
  with: { data: DataContext },
  let: $ => {
    $({
      for: UacUserBasicForm,

      resolve: $ =>
        DataFormResolver($, User, {}, c => $ =>
          $({
            valueConfig: ($, row) => $(row),
            commitConfig: ($, v) => $(v),
          })
        ),

      let: $ => {
        $({
          at: "input",
          let: $ => {
            $({
              at: ["firstName", "lastName"],
              configure: c => $ =>
                $({
                  minLength: 2,
                }),
            });

            $({
              at: "loginName",
              configure: c => $ =>
                $({
                  config: { minLength: 5 },
                  [inputBaseConfig]: {
                    check: value =>
                      c.data.checkUnique(User, {
                        loginName: value,
                      }),
                  },
                }),
            });
          },
        });
      },
    });

    $({
      for: UacGroupForm,

      resolve: $ =>
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
        ),

      let: $ => {
        $({
          at: "input.groupName",
          configure: c => $ =>
            $({
              config: { minLength: 4, titleCase: true },
              [inputBaseConfig]: {
                check: name => c.data.checkUnique(Group, { name }),
              },
            }),
        });
      },
    });

    $({
      for: UacUserContactForm,

      resolve: $ =>
        DataFormResolver($, User, {}, c => $ =>
          $({
            valueConfig: ($, row) => $(row),
            commitConfig: ($, v) =>
              $({
                email: v.email || null,
                mobilePhone: v.mobilePhone || null,
              }),
          })
        ),

      let: $ => {
        $({
          at: "input.email",
          configure: c => $ =>
            $({
              config: {
                // TODO: pattern
              },
              [inputBaseConfig]: {
                check: email => c.data.checkUnique(User, { email }),
              },
            }),
        });
      },
    });
  },
});
