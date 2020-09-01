import {NoRpc} from "./NoRpc";
import {NoWidgetContext} from "./NoWidgetContext";
import {AnyRpc, Rpc, RpcConfig, RpcType} from "./Rpc";
import {Widget} from "./Widget";

export type RpcConfigurator<C, T extends AnyRpc> =
    Rpc<Omit<RpcType<T>, "Config"> & { Config: C }>

export function RpcConfigurator<C, T extends AnyRpc>(rpc: T, getConfig: (config: C) => RpcConfig<T>): RpcConfigurator<C, T> {
    return Object.setPrototypeOf({

        createRpcHandler: config => rpc.createRpcHandler(
            getConfig(config)
        )

    }, rpc);
}

export type NoWidget = Widget<{
    Handler: {},
    Controller: NoRpc,
    Props: {},
    Context: {},
    Connection: {}
    Config: null
    Element: undefined
}>;

export const NoWidget: NoWidget = Widget({
    props: {},
    handler: {},
    controller: NoRpc,
    getContextClass: () => NoWidgetContext,

    createConnection: () => ({})
});
