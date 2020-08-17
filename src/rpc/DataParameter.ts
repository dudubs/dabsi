import {DataRow} from "../data/DataRow";
import {DataSource} from "../data/DataSource";
import {AnyRpc, Rpc, RpcConfigOf, RpcHandler, RpcPayloadOf, RpcResultOf} from "./Rpc";

export type DataParameter<T, R extends AnyRpc> =
    Rpc<RpcHandler<[string, RpcPayloadOf<R>], RpcResultOf<R>>,
        (key: string) => Promise<DataRow<T>>,
        {
            source: DataSource<T>
            target: (row: DataRow<T>) => RpcConfigOf<R>
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
