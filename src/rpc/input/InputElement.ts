import {Awaitable} from "../../common/typings";
import {AnyInput, Input, InputType} from "./Input";

export type ElementInput<E, T extends AnyInput> = Input<{
    Data: InputType<T>['Data'],
    Value: InputType<T>['Value'],
    Static: {},
    Config: {
        getElement: () => Awaitable<E>,
        target: InputType<T>['Config']
    }
    Element: [E, InputType<T>['Element']]
    Error: InputType<T>['Error']
    Controller: T

}>;


export function ElementInput<E>() {
    return <I extends AnyInput>(target: I) => {
        return Input<InputType<ElementInput<E, I>>>({
            static: {},
            controller: target,
            createContext: config => {
                return {
                    loadAndCheck: data => target.getContext(config.target).loadAndCheck(data),
                    getControllerConfig: () => config.target,
                    getElement: async () => {
                        return [await config.getElement(),
                            await target.getContext(config.target).getElement()]
                    },
                }
            }
        })
    }
}

// Meta

