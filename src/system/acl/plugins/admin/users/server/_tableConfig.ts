// import { DataContext } from "@dabsi/modules/data/context";
// import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
// import { User } from "@dabsi/system/acl/entities/User";
// import { ACL_Admin_UsersTable } from "@dabsi/system/acl/plugins/admin/users/common/rpc";

// import { DataTable } from "@dabsi/typerpc/data-table/rpc";

// export namespace ACL_Admin_UsersTableConfig {
//   export const columns: Record<
//     string,
//     DataTable.ColumnConfig<
//       {
//         Row: any;
//         Data: User;
//       },
//       any
//     >
//   > = {};

//   columns.fullName = {
//     load: data => String(data),
//     field: { $join: [["firstName", "lastName"], " "] },
//   };
// }

// export default RpcConfigResolver(
//   ACL_Admin_UsersTable,
//   {
//     data: DataContext,
//   },
//   c => $ =>
//     $({
//       source: c.data.getSource(User).pick([]),
//       columns: {
//         // loginNamex: "loginName",
//         ...(ACL_Admin_UsersTableConfig.columns as {}),
//       },
//       searchIn: ["firstName", "lastName"],
//     })
// );
