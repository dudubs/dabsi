import { ACL_Admin_GroupsTable } from "@dabsi/system/acl/admin/common/groupsTable";
import { ACL_Admin_UsersTable } from "@dabsi/system/acl/admin/common/usersTable";

import { DataForm } from "@dabsi/old-typerpc/data-form/rpc";
import { NameInput } from "@dabsi/old-typerpc/input//NameInput";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import UniqueInput from "@dabsi/old-typerpc/input/UniqueInput";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/old-typerpc/rpc-parameter/rpc";

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
