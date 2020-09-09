import {Awaitable, If, IfNull} from "../../common/typings";
import {NoRpc} from "../NoRpc";
import {AnyInput, Input} from "./Input";
import {NullableInput, NullableInputOptions} from "./NullableInput";
import {SelectInputContext} from "./SelectInputContext";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

/*

    SelectInput<T>
 */

export type SelectInput<T, N extends boolean> = NullableInput<N, {
    Data: string
    Controller: NoRpc,
    Value: T
    Props: {}

    Config: {
        load(key: string): Awaitable<T | undefined>
        default?: ValueOrAwaitableFn<string | undefined>;
        options: ValueOrAwaitableFn<{ label: string, key: string }[]>
    }

    Element: {
        default: string | undefined,
        options: { key: string, label: string }[]
    }

    Error: "REQUIRED"
}>;


export function SelectInput<T, N extends boolean = true>(
    options: NullableInputOptions<N> = {}
): SelectInput<T, N> {


    return <any>Input<SelectInput<AnyInput, any>>({
        props: {nullable: options.nullable ?? true},
        context: SelectInputContext,

    })

}
