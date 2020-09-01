import {Awaitable} from "../../common/typings";
import {ElementInputContext} from "./ElementInputContext";
import {AnyInput, Input, InputType} from "./Input";

export type ElementInput<E, T extends AnyInput> = Input<{
    Data: InputType<T>['Data'],
    Value: InputType<T>['Value'],
    Props: { target: T },
    Config: {
        getElement: () => Awaitable<E>,
        target: InputType<T>['Config']
    }
    Element: [E, InputType<T>['Element']]
    Error: InputType<T>['Error']
    Controller: T

}>;

export function ElementInput<E>() {
    return <T extends AnyInput>(target: T) => {
        return Input<ElementInput<E, T>>({
            props: {target},
            controller: target,
            getContextClass: () => ElementInputContext,

        })
    }
}

// Meta

