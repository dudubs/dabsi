import { DataTable } from "@dabsi/typerpc/data-table/rpc";

export const ACL_Admin_GroupsTable = DataTable({
  groupName: String,
  countUsers: Number,
});
