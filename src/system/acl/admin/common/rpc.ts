import AdminRpc from "@dabsi/system/admin/common/rpc";
import { Rpc, RpcContextual } from "@dabsi/typerpc2";
import { DataTable } from "@dabsi/typerpc2/data-table/rpc";

export class ACL_GroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}

export default class ACL_AdminRpc extends Rpc {
  static instance = AdminRpc.register("acl", ACL_AdminRpc);

  @RpcContextual()
  groupsTable!: ACL_GroupsTable;
}
