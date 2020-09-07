import {AnyInput, Input, InputType} from "./Input";

export type InputAdapter<V, T extends AnyInput> =
    Input<Omit<InputType<T>, "Config" | "Value"> & {
        Config: {
            targetConfig: InputType<T>['Config']
            load(value: InputType<T>['Value']): Promise<V>
        }
        Value: V
    }>;


export function InputAdapter<V>() {
    return <T extends AnyInput>(target: T): InputAdapter<V, T> => {
        return Object.setPrototypeOf(<Pick<InputAdapter<any, AnyInput>, "getContext">>{
            getContext(config) {
                const context = target.getContext(config.targetConfig)
                return Object.assign(<Pick<typeof context, "loadAndCheck">>{
                    async loadAndCheck(data) {
                        const value = await context.loadAndCheck(data)
                        return config.load(value)
                    }
                }, target.getContext(config.targetConfig))
            }
        }, target)

    }
}
