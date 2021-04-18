import { DataTable } from "@dabsi/typerpc/data-table/rpc";

export const ACL_Admin_UsersTable = DataTable({
  loginName: String,
  firstName: String,
  lastName: String,
});
