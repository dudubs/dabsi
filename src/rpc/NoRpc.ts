import {Rpc, RpcHandler} from "./Rpc";

export type NoRpc = Rpc<{
    Handler: RpcHandler<null, null>,
    Connection: null,
    Config: null
}>;
export const NoRpc: NoRpc = {
    connect(handler) {
        return null
    },
    handle(config) {
        return async () => {
            throw new Error()
        }
    }
};
