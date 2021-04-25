import { DataRowContext } from "@dabsi/modules/data/rowContext";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { checkUniqueName } from "@dabsi/system/acl/checkUniqueName";
import { User } from "@dabsi/system/acl/entities/User";
import {
  ACL_Admin_User_BasicInfoInput,
  ACL_Admin_User_ContactInfoInput,
} from "@dabsi/system/acl/admin/common/usersRpc";
import { DataFormConfigResolver } from "@dabsi/old-typerpc/data-form/handler";

export default [
  RpcResolver(
    ACL_Admin_User_BasicInfoInput.at("map.loginName"),
    {
      user: DataRowContext(User),
    },
    c => $ =>
      $({
        $check: async loginName =>
          checkUniqueName(
            c.user.getSource(),
            "loginName",
            loginName,
            (await c.user.fetch(["loginName"])).loginName
          ),
      })
  ),
  DataFormConfigResolver(ACL_Admin_User_BasicInfoInput, User, {}, c => $ =>
    $({
      selection: { pick: ["firstName", "lastName", "loginName"] },
      inserttable: true,
      valueConfig: ($, user) =>
        $({
          loginName: user?.loginName,
          firstName: user?.firstName,
          lastName: user?.lastName,
        }),
      commitConfig: ($, value) => $(value),
    })
  ),
  DataFormConfigResolver(ACL_Admin_User_ContactInfoInput, User, {}, c => $ =>
    $({
      selection: { pick: ["email", "mobilePhone"] },
      valueConfig: ($, user) =>
        $({
          email: user?.email,
          mobilePhone: user?.mobilePhone,
        }),
      commitConfig: ($, value) => $(value),
    })
  ),
];
