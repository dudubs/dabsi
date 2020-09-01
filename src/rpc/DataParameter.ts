import {DataKey, DataKeyInput} from "../data/DataKey";
import {DataRow} from "../data/DataRow";
import {DataSource} from "../data/DataSource";
import {AnyRpc, Rpc, RpcConfig, RpcConnection, RpcHandlerFn, RpcPayload, RpcResult} from "./Rpc";
import {RpcGenericConfig, RpcGenericConfigFn} from "./RpcGenericConfig";


type DataParameterConfig<R extends AnyRpc, T = any> = {
    source: DataSource<T>,
    getTargetConfig: (row: DataRow<T>) => RpcConfig<R>
};


export type DataParameter<R extends AnyRpc> = Rpc<{
    Handler: RpcHandlerFn<[string, RpcPayload<R>], RpcResult<R>>,
    Connection: (key: DataKeyInput) => RpcConnection<R>,
    Config: RpcGenericConfigFn<<T>(config: DataParameterConfig<R, T>) =>
        DataParameterConfig<R>>
}>;

export function DataParameter<R extends AnyRpc>(
    target: R
): DataParameter<R> {
    return {
        createRpcConnection: handler => key =>
            target.createRpcConnection(payload => handler([DataKey(key), payload])),

        createRpcHandler: RpcGenericConfigFn(config => {
            return async ([key, payload]) => {
                const row = await config.source.getOrFail(key);
                const targetConfig = config.getTargetConfig(row);
                return target.createRpcHandler(targetConfig)(payload);
            }
        })
    }
}
