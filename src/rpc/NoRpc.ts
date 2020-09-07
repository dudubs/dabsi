import {Rpc, RpcHandlerFn} from "./Rpc";


export type NoRpc = Rpc<{
    Handler: RpcHandlerFn<null, null>,
    Connection: null,
    Config: null
}> & { name: "NoRpc" };
export const NoRpc: NoRpc = {
    name:"NoRpc",
    createRpcConnection(handler) {
        return null
    },
    createRpcHandler(config) {
        return async () => {
            throw new Error()
        }
    }
};
