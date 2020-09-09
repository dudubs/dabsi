import {DataRow} from "../data/DataRow";
import {DataSource} from "../data/DataSource";
import {Parameter} from "./Parameter";
import {AnyRpc, RpcConfig} from "./Rpc";
import {RpcConfigurator, RpcGenericConfigurator} from "./RpcConfigurator";
import {RpcConfigFactory, RpcGenericConfigFn} from "./RpcGenericConfig";

export type DataParameter<R extends AnyRpc> =
    RpcConfigurator<Parameter<R, string>,
        RpcGenericConfigFn<<T>(config: DataParameterConfig<T, R>) => DataParameterConfig<any, R>>>;

export function DataParameter<R extends AnyRpc>(target: R): DataParameter<R> {
    return RpcGenericConfigurator<DataParameter<R>>(
        Parameter()(target),
        DataParameterConfig
    )
}

export type DataParameterConfig<T, R extends AnyRpc> = {
    source: DataSource<T>,
    getTargetConfig: RpcConfigFactory<DataRow<T>, R>
}

export function DataParameterConfig<T, R extends AnyRpc>(
    config: DataParameterConfig<T, R>
): RpcConfig<Parameter<R, string>> {
    return $ => $({
        load(data) {
            return config.source.getOrFail(data)
        },
        getTargetConfig: config.getTargetConfig
    })
}
