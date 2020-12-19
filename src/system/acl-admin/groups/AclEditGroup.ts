import { RpcFn } from "./../../../typerpc/rpc-fn/RpcFn";
import AclUsersManager from "@dabsi/system/acl-admin/users/AclUsersManager";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { RpcMap } from "./../../../typerpc/rpc-map/RpcMap";

export default RpcMap({
  root: WidgetNamespace(),
  users: DataTable({
    isChecked: Boolean,
    ...AclUsersManager.at("table").row.fields,
  }),

  updateUsers: RpcFn<(_: { changes: Record<string, boolean> }) => void>(),
});
