import { DataTable } from "@dabsi/typerpc2/data-table/rpc";

export default class AclUsersTable extends DataTable({
  loginName: String,
  firstName: String,
  lastName: String,
}) {}
