import {Awaitable, DefaultIfNever, IfNever, PartialUndefinedKeys} from "../../common/typings";
import {AnyInput, Input, InputType} from "./Input";

export type InputLoader<V, E, T extends AnyInput> =
    Input<Omit<InputType<T>, "Config" | "Value" | "Error"> & {
        LoaderInput: T;
        LoaderError: E;

        Config: PartialUndefinedKeys<{
            readonly targetConfig: InputType<T>['Config']
            load: ((value: InputType<T>['Value']) => Awaitable<V>)
                | IfNever<V, undefined>
            check: ((value: V) => Awaitable<E | undefined>)
                | IfNever<E, undefined>
        }>
        Value: DefaultIfNever<V, InputType<T>['Value']>
        Error: InputType<T>['Error'] | E;
    }>;

export type AnyInputErrorLoader =
    InputLoader<any, any, AnyInput>|InputLoader<never, any, AnyInput>;
export function InputErrorLoader<E>() {
    return <T extends AnyInput>(target: T): InputLoader<never, E, T> =>
        <any>InputLoader<any, any>()(target)
}

export function InputLoader<V, E = never>() {
    return <T extends AnyInput>(target: T): InputLoader<V, E, T> => {
        return Object.setPrototypeOf(<Pick<InputLoader<any, any, AnyInput>, "getContext">>{
            getContext(config) {
                const context = target.getContext(config.targetConfig)
                return Object.assign(<Pick<typeof context, "loadAndCheck">>{
                    async loadAndCheck(data) {
                        const value = await context.loadAndCheck(data);
                        const error = config.check?.(value);
                        if (error !== undefined)
                            return {error}
                        return config.load?.(value)
                    }
                }, target.getContext(config.targetConfig))
            }
        }, target)

    }
}


