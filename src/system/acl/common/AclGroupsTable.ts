import { DataTable } from "@dabsi/typerpc2/data-table/rpc";

export default class AclGroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}
