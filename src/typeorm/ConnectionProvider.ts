// import { ModuleProvider } from "../../../../src/typedi/Module";
// import { Resolver } from "../../../../src/typedi";
// import { Connection, ConnectionOptions, createConnection } from "typeorm";
//
// export const ConnectionPromise = Resolver<Promise<Connection>>();
//
// export function ConnectionProvider(options: ConnectionOptions): ModuleProvider {
//   let connectionPromise: Promise<Connection>;
//   let connection: Connection;
//   return () => ({
//     ...Connection.provide(() => connection),
//     ...ConnectionPromise.provide(
//       () => connectionPromise || (connectionPromise = createConnection(options))
//     ),
//   });
// }
