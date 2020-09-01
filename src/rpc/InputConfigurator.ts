import {AnyInput, Input, InputType} from "./input/Input";
import {RpcConfig} from "./Rpc";
import {RpcConfigurator} from "./RpcConfigurator";

export type InputConfigurator<C, T extends AnyInput> =
    Input<Omit<InputType<T>, "Config"> & { Config: C }>;
export const InputConfigurator: {
    <C, T extends AnyInput>(
        input: T, getConfig: (config: C) => RpcConfig<T>
    ): InputConfigurator<C, T>
} = <any>RpcConfigurator;
