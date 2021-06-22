// import { DataContext } from "@dabsi/modules/data/context";
// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { User } from "@dabsi/system/acl/entities/User";
// import { AclAdmin_UsersTable } from "@dabsi/system/acl/admin/users/common/rpc";

// import { DataTable } from "@dabsi/old-typerpc/data-table/rpc";

// export namespace AclAdmin_UsersTableConfig {
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

// export default RpcResolver(
//   AclAdmin_UsersTable,
//   {
//     getDataSource: DataSourceFactory2,
//   },
//   c => $ =>
//     $({
//       source: c.data.getSource(User).pick([]),
//       columns: {
//         // loginNamex: "loginName",
//         ...(AclAdmin_UsersTableConfig.columns as {}),
//       },
//       searchIn: ["firstName", "lastName"],
//     })
// );
