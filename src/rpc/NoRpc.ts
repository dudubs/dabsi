import {Rpc, RpcHandler} from "./Rpc";

export type NoRpc = Rpc<RpcHandler<null, null>, null, null>;
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
