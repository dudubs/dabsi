import { DataTable } from "@dabsi/typerpc/data-table/rpc";

export default class UacGroupsTable extends DataTable({
  groupName: String,
  countUsers: Number,
}) {}
