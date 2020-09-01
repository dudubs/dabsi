import {NoRpc} from "../NoRpc";
import {BoolInputContext} from "./BoolInputContext";
import {Input} from "./Input";

export type BoolInput = Input<{
    Data: boolean,
    Value: boolean,
    Config: {
        default: boolean,
    },
    Props: {},
    Element: boolean
    Error: undefined,
    Controller: NoRpc
}>;


export function BoolInput(): BoolInput {
    return Input({
        props: {},
        controller: NoRpc,
        getContextClass: () => BoolInputContext,
    })
}
