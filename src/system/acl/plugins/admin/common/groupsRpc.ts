import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/plugins/admin/common/groupsTable";
import { ACL_Admin_UsersTable } from "@dabsi/system/acl/plugins/admin/users/common/rpc";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/typerpc/input/text-input/TextInput";
import UniqueInput from "@dabsi/typerpc/input/UniqueInput";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

export const ACL_Admin_GroupBasicInput = InputMap({
  groupName: UniqueInput(TextInput()),
});

export const ACL_Admin_GroupBasicInfoForm = Form({
  input: ACL_Admin_GroupBasicInput,
});

// ACL_Admin_GroupUsersTable
export const ACL_Admin_GroupsRpc = RpcMap({
  add: ACL_Admin_GroupBasicInfoForm,
  table: ACL_Admin_GroupsTable,
  item: RpcParameter(
    String,
    RpcMap({
      //
      delete: RpcFn(),
      basicInfo: ACL_Admin_GroupBasicInfoForm,
      users: ACL_Admin_UsersTable,
      updateUsers: RpcFn<(checkMap: Record<string, boolean>) => void>(),
    })
  ),
});
