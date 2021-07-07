// import { DataContext } from "@dabsi/modules/data/context";
// import { RpcResolver } from "@dabsi/modules/rpc/configResolver";
// import { User } from "@dabsi/system/uac/entities/User";
// import { UacAdmin_UsersTable } from "@dabsi/system/uac/admin/users/common/rpc";

// import { DataTable } from "@dabsi/old-typerpc/data-table/rpc";

// export namespace UacAdmin_UsersTableConfig {
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
//   UacAdmin_UsersTable,
//   {
//     getDataSource: DataSourceFactory2,
//   },
//   c => $ =>
//     $({
//       source: c.data.getSource(User).pick([]),
//       columns: {
//         // loginNamex: "loginName",
//         ...(UacAdmin_UsersTableConfig.columns as {}),
//       },
//       searchIn: ["firstName", "lastName"],
//     })
// );
