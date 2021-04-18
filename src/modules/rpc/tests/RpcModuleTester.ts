// import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
// import { Tester } from "@dabsi/jasmine/Tester";
// import RpcModule from "@dabsi/modules/rpc";
// import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
// import OldModuleTester from "@dabsi/system/rich-text/tests/OldOldModuleTester";
// import { Resolver } from "@dabsi/typedi";
// import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";

// // RpcOldModuleTester
// export const RpcOldModuleTester = (t: ReturnType<typeof OldModuleTester>) => {
//   return Tester.beforeAll(() => {
//     const module = t.moduleRunner.getInstance(RpcModule);
//     const requestRef = { current: new RpcRequest([], {}, {}) };

//     t.provide(Resolver(RpcRequest, () => requestRef.current));

//     return {
//       module,
//       requestRef,
//       createConnection: <T extends AnyRpc>(rpc: T): RpcConnection<T> => {
//         const configResolver = module.getConfigResolver(rpc);

//         return rpc.createRpcConnection([], async (path, payload) => {
//           const process = new AsyncProcess2();

//           const config = Resolver.resolve(
//             configResolver,
//             Resolver.Context.create(t.moduleRunner.context, [process])
//           );
//           const command = rpc.createRpcCommand(config);

//           return process.waitFor(() => command(path, payload));
//         });
//       },
//     };
//   });
// };
