import {Rpc, RpcHandler} from "./Rpc";

export type NoRpc = Rpc<{
    Handler: RpcHandler<null, null>,
    Connection: null,
    Config: null
}>;
export const NoRpc: NoRpc = {
    createRpcConnection(handler) {
        return null
    },
    createRpcHandler(config) {
        return async () => {
            throw new Error()
        }
    }
};
