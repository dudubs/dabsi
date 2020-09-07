import {Awaitable, If, IfNull} from "../../common/typings";
import {NoRpc} from "../NoRpc";
import {AnyInput, Input} from "./Input";
import {SelectInputContext} from "./SelectInputContext";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

/*

    SelectInput<T>
 */

export type SelectInput<T, N extends boolean> = Input<{
    Data: string | If<N, null>
    Controller: NoRpc,
    Value: T | If<N, null>
    Props: { nullable: N }

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
    {nullable}: {
        nullable?: N
    } = {}
): SelectInput<T, N> {


    return <any>Input<SelectInput<AnyInput, any>>({
        props: {nullable: nullable ?? true},
        getContextClass: () => SelectInputContext,

        // server:start
        /*

        context:{

        }

         */

        // server:end

    })

}
