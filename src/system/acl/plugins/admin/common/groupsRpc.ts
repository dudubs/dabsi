import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/plugins/admin/common/groupsTable";
import { ACL_Admin_UsersTable } from "@dabsi/system/acl/plugins/admin/common/usersTable";

import { DataForm } from "@dabsi/typerpc/data-form/rpc";
import { NameInput } from "@dabsi/typerpc/input//NameInput";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import UniqueInput from "@dabsi/typerpc/input/UniqueInput";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";

export const ACL_Admin_GroupBasicInput = InputMap({
  groupName: UniqueInput(NameInput()),
});

// ACL_Admin_GroupUsersTable
export const ACL_Admin_GroupsRpc = RpcMap({
  add: DataForm(ACL_Admin_GroupBasicInput),
  table: ACL_Admin_GroupsTable,
  item: RpcParameter(
    String,
    RpcMap({
      //
      delete: RpcFn(),
      basicInfo: DataForm(ACL_Admin_GroupBasicInput),
      users: ACL_Admin_UsersTable,
      updateUsers: RpcFn<(checkMap: Record<string, boolean>) => void>(),
    })
  ),
});
