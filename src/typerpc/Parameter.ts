import {WithMetaType} from "../common/MetaType";
import {AnyRpc, Rpc, RpcConnection, RpcHandlerFn, RpcPayload, RpcResult} from "./Rpc";
import {ConfigFactory, RpcConfigFactory, RpcGenericConfigFn, RpcGenericConfigHandler} from "./RpcGenericConfig";

export type ParameterConfig<R extends AnyRpc, D, V> = {
    load(data: D): Promise<V>;
    getTargetConfig: RpcConfigFactory<V, R>
};

export type Parameter<R extends AnyRpc, D,BaseV=any> =
    WithMetaType<{ ParameterRpc: R }> &
    Rpc<{


        Data: D;

        Handler:
            RpcHandlerFn<[D, RpcPayload<R>], RpcResult<R>>

        Connection:
            (data: D) => RpcConnection<R>

        Config:
            RpcGenericConfigFn<<V extends BaseV>(config: ParameterConfig<R, D, V>) => ParameterConfig<R, D, any>>

    }> & { target: R };

export function Parameter<D = string>() {
    return <R extends AnyRpc>(target: R): Parameter<R, D> => ({
        target,
        createRpcConnection: handler => {
            return data => {
                return target.createRpcConnection(payload => {
                    return handler([data, payload])
                })
            }
        },
        createRpcHandler: RpcGenericConfigHandler(config => {

            return async ([data, payload]) => {
                const value = await config.load(data);
                const targetConfig = ConfigFactory(config.getTargetConfig, value);
                const targetHandler = target.createRpcHandler(targetConfig)
                return targetHandler(payload);
            }
        })
    })
}
