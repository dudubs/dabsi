import {RpcConfig} from "./Rpc";
import {RpcConfigurator} from "./RpcConfigurator";
import {AnyWidget, Widget, WidgetType} from "./Widget";

export type WidgetConfigurator<C, T extends AnyWidget> =
    Widget<Omit<WidgetType<T>, "Config"> & { Config: C }>;

export const WidgetConfigurator: {
    <C, T extends AnyWidget>(
        widget: T, getConfig: (config: C) => RpcConfig<T>
    ): WidgetConfigurator<C, T>
} = <any>RpcConfigurator;
