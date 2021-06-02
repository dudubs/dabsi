import { ACL_Admin_UsersTable } from "@dabsi/system/acl/admin/common/usersTable";
import { DataForm } from "@dabsi/old-typerpc/data-form/rpc";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { NameInput } from "@dabsi/old-typerpc/input/NameInput";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import UniqueInput from "@dabsi/old-typerpc/input/UniqueInput";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/old-typerpc/rpc-parameter/rpc";

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
