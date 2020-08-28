import {Input} from "./Input";
import {NoRpc} from "../NoRpc";

export type BoolInput = Input<{
    Data: boolean,
    Value: boolean,
    Config: {
        default: boolean,
    },
    Static: {},
    Element: boolean
    Error: undefined,
    Controller: NoRpc
}>;


export function BoolInput(): BoolInput {
    return Input({
        static: {},
        controller: NoRpc,
        createContext: config => ({
            getControllerConfig: () => null,
            loadAndCheck: data => ({value: Boolean(data)}),
            getElement: () => config.default
        }),
    })
}
