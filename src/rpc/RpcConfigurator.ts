import {Fn} from "../common/typings";
import {AnyRpc, Rpc, RpcConfig, RpcType} from "./Rpc";
import {RpcGenericConfig, RpcGenericConfigFn} from "./RpcGenericConfig";

export type RpcConfigurator<T extends AnyRpc, C> =
    Omit<T, keyof AnyRpc> &
    Rpc<Omit<RpcType<T>, "Config"> & { Config: C }> & {

    TRpcConfigurator?: {
        SourceConfig: C
        Target: T
    }
}

export type RpcGenericConfigurator<T extends AnyRpc, C extends Fn> =
    RpcConfigurator<T, RpcGenericConfigFn<C>>

export type AnyRpcConfigurator = RpcConfigurator<AnyRpc, any>;

export type RpcConfiguratorType<T extends AnyRpcConfigurator> =
    NonNullable<T['TRpcConfigurator']>;


export function RpcConfigurator<T extends AnyRpcConfigurator>(
    target: RpcConfiguratorType<T>['Target'],
    getConfig: (config: RpcConfiguratorType<T>['SourceConfig']) =>
        RpcConfig<RpcConfiguratorType<T>['Target']>
):
    RpcConfigurator<RpcConfiguratorType<T>['Target'],
        RpcConfiguratorType<T>['SourceConfig']> {

    return Object.setPrototypeOf(<Pick<AnyRpc, "createRpcHandler">>{

        createRpcHandler(config) {
            return target.createRpcHandler.apply(this, [
                getConfig(config),
                this
            ]);
        }

    }, target);
}


export type AnyRpcGenericConfigurator = RpcConfigurator<AnyRpc, RpcGenericConfigFn>;

export function RpcGenericConfigurator<T extends AnyRpcConfigurator>(
    target: RpcConfiguratorType<T>['Target'],
    getConfig: (config: ReturnType<RpcConfiguratorType<T>['SourceConfig']>) =>
        RpcConfig<RpcConfiguratorType<T>['Target']>
):
    RpcConfigurator<RpcConfiguratorType<T>['Target'],
        RpcConfiguratorType<T>['SourceConfig']> {

    return RpcConfigurator(target, (genericConfig) => {
        return getConfig(RpcGenericConfig(genericConfig))
    })
}

