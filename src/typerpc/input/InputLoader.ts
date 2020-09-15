import {Awaitable, DefaultIfNever, If, IfNever, Is, IsSome, PartialUndefinedKeys} from "../../common/typings";
import {RpcConfig} from "../Rpc";
import {AnyInput, ErrorOrValue, Input, InputError, InputType, InputValue} from "./Input";

export type InputLoader<V, E, T extends AnyInput> =

    Input<Omit<InputType<T>, "Config" | "Value" | "Error"> & {
        LoaderInput: T;
        LoaderError: E;

        Config: PartialUndefinedKeys<{

            targetConfig: RpcConfig<T>

            load: ((value: InputValue<T>) => Awaitable<V>)
                | If<IsSome<V, InputValue<T>>, undefined>
            check: ((value: V) => Awaitable<E | undefined>)
                | IfNever<E, undefined>

        }>
        Value: DefaultIfNever<V, InputValue<T>>
        Error: InputError<T> | E;
    }>;

export type AnyInputLoader =
    InputLoader<any, any, AnyInput>;


export function InputErrorLoader<E>() {
    return <T extends AnyInput>(target: T): InputLoader<InputValue<T>, E, T> =>
        <any>InputLoader<any, any>()(target)
}


export function InputLoader<V, E = never>() {
    return <T extends AnyInput>(target: T): InputLoader<V, E, T> => {

        type I = InputLoader<any, any, AnyInput>;

        return Object.setPrototypeOf(<Pick<InputLoader<any, any, AnyInput>,
            "getContext">>{

            getContext(config: RpcConfig<I>) {

                const context = target.getContext.call(this,
                    config.targetConfig);

                return Object.setPrototypeOf(<Pick<typeof context, "loadAndCheck">>{
                    async loadAndCheck(data) {
                        const result: ErrorOrValue<any, any> = await context.loadAndCheck.call(this, data);
                        if ('error' in result)
                            return result;
                        const error = await config.check?.(result.value);
                        if (error !== undefined)
                            return {error}
                        if (config.load) {
                            const value = await config.load(result.value);
                            return {value}
                        }
                        return result
                    }
                }, context)
            }
        }, target)

    }
}




