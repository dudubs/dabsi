import {MetaType} from "../common/MetaType";
import {Fn} from "../common/typings";
import {OmitRequiredKeys} from "../data/DataExp";
import {AnyRpc, RpcConfig, RpcHook} from "./Rpc";
import {RpcGenericConfig, RpcGenericConfigFn} from "./RpcGenericConfig";


export type RpcConfigurator<T extends AnyRpc, C> =
    OmitRequiredKeys<T, AnyRpc> &
    RpcHook<T, {
        Config: C
    }, {
        Configurator: {
            Target: T
            ToConfig: C
        },
    }>;
// Rpc<Omit<RpcType<T>, "Config"> & { Config: C }>

export type RpcGenericConfigurator<T extends AnyRpc, C extends Fn> =
    RpcConfigurator<T, RpcGenericConfigFn<C>>

export type AnyRpcConfigurator = RpcConfigurator<AnyRpc, any>;

const baseGetConfigProp = "getConfig";

export function RpcConfigurator<T extends AnyRpcConfigurator>(
    target: MetaType<T>['Configurator']['Target'],
    getConfig: (config: MetaType<T>['Configurator']['ToConfig']) =>
        RpcConfig<MetaType<T>['Configurator']['Target']>
):
    RpcConfigurator<MetaType<T>['Configurator']['Target'],
        MetaType<T>['Configurator']['ToConfig']> {

    const baseGetConfig = target.createRpcHandler[baseGetConfigProp];

    if (baseGetConfig) {
        return RpcConfigurator(
            Object.getPrototypeOf(target),
            config => getConfig(baseGetConfig(config))
        )
    }
    createRpcHandler[baseGetConfigProp] = getConfig;

    return Object.setPrototypeOf({createRpcHandler}, target);

    function createRpcHandler(this: T, config) {
        return target.createRpcHandler.call(this,
            getConfig(config)
        );
    }
}


export type AnyRpcGenericConfigurator = RpcConfigurator<AnyRpc, RpcGenericConfigFn>;

export function RpcGenericConfigurator<T extends AnyRpcConfigurator>(
    target: MetaType<T>['Configurator']['Target'],
    getConfig: (config: ReturnType<RpcConfig<T>>) =>
        RpcConfig<MetaType<T>['Configurator']['Target']>
):
    RpcConfigurator<MetaType<T>['Configurator']['Target'],
        RpcConfig<T>> {

    return RpcConfigurator(target, (genericConfig) => {
        return getConfig(RpcGenericConfig(genericConfig))
    })
}

