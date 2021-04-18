// import { Fn } from "@dabsi/common/typings2/Fn";
// import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
// import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
// import { User } from "@dabsi/system/acl/entities/User";
// import { DataEntitySource } from "@dabsi/typedata/entity/source";
// import { DataExp } from "@dabsi/typedata/exp/exp";
// import { DataSource } from "@dabsi/typedata/source";
// import { DataInsertRow } from "@dabsi/typedata/value";
// import { GenericConfig } from "@dabsi/typerpc/GenericConfig";

// declare function RpcMethod(getType?: () => Function): PropertyDecorator;

// declare class RpcConnection {
//   constructor(command);
// }

// type RpcConnectionClass<T> = new () => T;

// declare const RpcHandlerSymbol: unique symbol;
// declare const RpcConfigSymbol: unique symbol;

// type WithRpcConfig<T> = Record<typeof RpcConfigSymbol, T>;
// type WithAnyRpcConfig = WithRpcConfig<any>;

// type RpcConfigType<T extends WithAnyRpcConfig> = T[typeof RpcConfigSymbol];

// type RpcHandler<Config> = {
//   config: Config;
// };

// declare function RpcConfig<T extends RpcConnectionClass<WithAnyRpcConfig>>(
//   conn: T,
//   config: RpcConfigType<InstanceType<T>>
// );
// ///---------

// class BaseDataTable<T> extends RpcConnection {
//   [RpcConfigSymbol]!: GenericConfig<{
//     <Data>(
//       options: PartialUndefinedKeys<
//         {
//           columns: UndefinedIfEmptyObject<
//             PartialUndefinedKeys<
//               {
//                 [K in keyof T]:
//                   | {
//                       field: DataExp<Data>;
//                     }
//                   | (K extends keyof Data ? undefined : never);
//               }
//             >
//           >;
//         },
//         {
//           source: DataSource<Data>;
//         }
//       >
//     ): any;
//   }>;

//   @RpcMethod() getRows!: () => T[];
// }

// declare function DataTable<T extends Record<string, Fn>>(
//   columns: T
// ): RpcConnectionClass<
//   BaseDataTable<
//     {
//       [K in keyof T]: ReturnType<T[K]>;
//     }
//   >
// >;

// class BaseWidget<Element extends object> extends RpcConnection {
//   @RpcMethod()
//   getElement!: () => Element;
// }

// type Widget<Element extends object> = BaseWidget<Element>;

// class BaseInput<ValueElement, ValueData, Error> extends BaseWidget<{
//   value: ValueElement;
// }> {
//   @RpcMethod() check!: (data: ValueData) => null | Error;
// }

// type Input<ValueElement, ValueData, Error> = BaseInput<
//   ValueElement,
//   ValueData,
//   Error
// >;

// type AnyInput = Input<any, any, any>;

// class BaseForm<Input extends AnyInput, FormValue> {}

// declare function Widget<Element>();

// class UsersDataTable extends DataTable({
//   loginName: String,
//   firstName: String,
//   lastName: String,
//   fullName: String,
// }) {}

// class DataManagerRpc<T> {
//   [RpcConfigSymbol]: GenericConfig<{
//     <T>(source: DataSource<T>): any;
//     options?: {};
//   }>;

//   @RpcMethod() add!: (row: DataInsertRow<T>) => string;

//   @RpcMethod() delete!: (key: string) => void;
// }

// class UserRpc {
//   @RpcMethod() changePassword!: (
//     oldPassword: string,
//     newPassword: string
//   ) => void;
// }

// class AclAdminRpc {
//   @RpcMethod(() => DataManagerRpc)
//   users!: DataManagerRpc<User>;

//   @RpcMethod(() => UserRpc)
//   getUser!: (userId: string) => UserRpc;
// }

// RpcConfig(UsersDataTable, $ =>
//   $({
//     source: DataEntitySource.createFromConnection(User),
//     columns: { fullName: { field: 3 } },
//   })
// );
