import { DataTable } from "@dabsi/typerpc/data-table/rpc";

export default class AclGroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}
