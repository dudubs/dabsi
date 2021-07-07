import { DataTable } from "@dabsi/typerpc/data-table/rpc";

export default class UacUsersTable extends DataTable({
  loginName: String,
  firstName: String,
  lastName: String,
}) {}
