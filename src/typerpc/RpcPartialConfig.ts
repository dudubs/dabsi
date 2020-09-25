import {PartialKeys, UndefinedIfEmptyObject} from "../common/typings";
import {Rpc, RpcConfig} from "./Rpc";
import {RpcConfigurator} from "./RpcConfigurator";

const baseDefaultConfigProp = "defaultConfig";



export type AnyRpcWithObjectConfig = Rpc<{
    Connection: any
    Config: object | undefined
    Handler: any
}>;


export type RpcPartialConfig<T extends AnyRpcWithObjectConfig,
    K extends keyof NonNullable<RpcConfig<T>>> =

    RpcConfigurator<T, UndefinedIfEmptyObject<PartialKeys<NonNullable<RpcConfig<T>>, K>>
        | RpcConfig<T>>;


// TODO: RpcDefaultConfig

export function RpcPartialConfig<T extends AnyRpcWithObjectConfig,
    K extends keyof NonNullable<RpcConfig<T>>>(
    target: T,
    defaultConfig: Pick<NonNullable<RpcConfig<T>>, K>
): RpcPartialConfig<T, K> {

    const baseDefaultConfig = target.createRpcHandler[baseDefaultConfigProp]

    if (baseDefaultConfig) {
        return <any>RpcPartialConfig(
            Object.getPrototypeOf(target),
            {...baseDefaultConfig, ...defaultConfig}
        );
    }

    const rpc = RpcConfigurator(target, config => {
        return {...defaultConfig, ...config}
    });

    rpc.createRpcHandler[baseDefaultConfigProp] = defaultConfig;
    return <any>rpc;

}
