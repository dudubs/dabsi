import { ACL_Admin_UsersTable } from "@dabsi/system/acl/plugins/admin/common/usersTable";
import { DataForm } from "@dabsi/typerpc/data-form/rpc";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { NameInput } from "@dabsi/typerpc/input/NameInput";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import UniqueInput from "@dabsi/typerpc/input/UniqueInput";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";

export const ACL_Admin_User_BasicInfoInput = InputMap({
  firstName: NameInput(),
  lastName: NameInput(),
  loginName: UniqueInput(
    TextInput({
      ...NameInput().loaderOptions,
      nullable: true,
    })
  ),
});

export const ACL_Admin_User_ContactInfoInput = InputMap({
  email: TextInput({
    nullable: true,
  }),
  mobilePhone: TextInput({
    nullable: true,
  }),
});

export const ACL_Admin_UsersRpc = RpcMap({
  add: DataForm(ACL_Admin_User_BasicInfoInput),
  table: ACL_Admin_UsersTable,
  item: RpcParameter(
    String,
    RpcMap({
      //
      delete: RpcFn(),
      basicInfo: DataForm(ACL_Admin_User_BasicInfoInput),
      contactInfo: DataForm(ACL_Admin_User_ContactInfoInput),
      users: ACL_Admin_UsersTable,
      updateGroups: RpcFn<(checkMap: Record<string, boolean>) => void>(),
    })
  ),
});
