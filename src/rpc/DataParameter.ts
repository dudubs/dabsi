import {DataRow} from "../data/DataRow";
import {DataSource} from "../data/DataSource";
import {AnyRpc, Rpc, RpcConfigType, RpcHandler, RpcPayloadType, RpcResultType} from "./Rpc";

export type DataParameter<T, R extends AnyRpc> = Rpc<{
    Handler: RpcHandler<[string, RpcPayloadType<R>], RpcResultType<R>>,
    Connection: (key: string) => Promise<DataRow<T>>,
    Config: {
        source: DataSource<T>
        target: (row: DataRow<T>) => RpcConfigType<R>
    }
}>;

export function DataParameter<T>():
    <R extends AnyRpc>(target: R) => DataParameter<T, R> {
    return target => {

        return {
            connect(handler) {
                return key => {
                    return target.connect(payload => {
                        return handler([key, payload])
                    })
                }
            },
            handle(config) {
                return async ([key, payload]) => {
                    const row = await config.source.getOrFail(key);
                    const handler = target.handle(config.target(row))
                    return handler(payload);
                }
            }
        }
    }
}
