import {NoRpc} from "../NoRpc";
import {EnumInputContext} from "./EnumInputContext";
import {Input} from "./Input";
import {NullableInput} from "./NullableInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

/*

    NullableInput()

 */


export type EnumInput<K extends string, N extends boolean> = NullableInput<N, {

    Controller: NoRpc,

    Data: K

    Value: K

    Props: { keys: Set<K> }

    Config: { default?: ValueOrAwaitableFn<K> }

    Element: { default?: K }

    Error: never

}>

export function EnumInput<K extends string, N extends boolean = true>(
    keys: K[],
    options?: { nullable?: N }): EnumInput<K, N> {
    return <any>Input<EnumInput<any, any>>({
        props: {
            nullable: options?.nullable ?? true,
            keys: new Set(keys)
        },
        context: EnumInputContext
    })
}


export const GenderInput = EnumInput(["male", "female"]);


