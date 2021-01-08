// import { Expect } from "@dabsi/common/typings2/Expect";
// import { Override } from "@dabsi/common/typings2/Override";
// import { DataTableInputHandler } from "@dabsi/typerpc/input/data-table-input/DataTableInputHandler";
// import { InputValue } from "@dabsi/typerpc/input/Input";
// import {
//   AnyDataTable,
//   DataTable,
//   DataTableType,
// } from "@dabsi/typerpc/widget/data-table/DataTable";
// import { DataRow } from "@dabsi/typedata/DataRow";
// import { PartialConfigKeys } from "@dabsi/typerpc/Config";
// import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
// import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
// import { DataTableTypes } from "@dabsi/typerpc/widget/data-table/DataTable";
// import {
//   AnyInput,
//   Input,
//   InputValueConfig,
//   InputValueData,
//   InputValueElement,
// } from "@dabsi/typerpc/input/Input";

// type TDataTableInput = {
//   Data: any;
//   Table: AnyDataTable;
//   Target: AnyInput;
// };

// interface _Types<T extends TDataTableInput> {
//   Table: DataTable<
//     Override<
//       DataTableType<T["Table"]>,
//       {
//         Data: T["Data"];
//         Row: DataTableType<T["Table"]>["Row"] & {
//           $value: InputValueElement<T["Target"]>;
//         };
//       }
//     >
//   >;

//   TableTypes: DataTableTypes<DataTableType<_Types<T>["Table"]>>;

//   OptionalConfig: {
//     targetConfig: RpcUnresolvedConfig<T["Target"]>;
//   };

//   RequiredConfig: {
//     tableConfig: RpcUnresolvedConfig<_Types<T>["Table"]>;
//     getRowValue: (row: DataRow<T["Data"]>) => InputValue<T["Target"]>;
//   };

//   Config: PartialConfigKeys<_Types<T>>;
// }

// export type DataTableInput<T extends TDataTableInput> = Input<{
//   ValueData: Record<string, InputValueData<T["Target"]>>;

//   ValueConfig: Record<string, InputValueConfig<T["Target"]>>;

//   Value: Record<string, InputValue<T["Target"]>>;

//   ValueElement: Record<string, InputValueElement<T["Target"]>>;

//   Controller: {};

//   Props: {};

//   Config: GenericConfig<{
//     <Data>(
//       config: _Types<Override<T, { Data: Data }>>["Config"]
//     ): _Types<T>["Config"];
//   }>;

//   Element: {};

//   Error: never;
// }>;

// export type TOptions = {
//   table: AnyDataTable;
//   target: AnyInput;
// };

// type TFromOptions<T extends TOptions> = Expect<
//   TDataTableInput,
//   {
//     Data: any;
//     Table: T["table"];
//     Target: T["target"];
//   }
// >;

// export type AnyDataTableInput = DataTableInput<TDataTableInput>;

// export function DataTableInput<T extends TOptions>(
//   options: T
// ): DataTableInput<TFromOptions<T>> {
//   const { table, target } = options as TOptions;
//   return <any>Input<AnyDataTableInput>({
//     handler: DataTableInputHandler as any,
//     getValueDataFromValueElement() {
//       return {};
//     },
//   });
// }
