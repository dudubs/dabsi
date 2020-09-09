import {NoRpc} from "../NoRpc";
import {RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {Input, InputCheckResult, InputData} from "./Input";
import {NullableInput} from "./NullableInput";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

/*

    NullableInput()

 */


export type EnumInput<K extends string, N extends boolean> = NullableInput<N, {

    Controller: NoRpc,

    Data: K

    Value: K

    Props: {
        keys: Set<K>
    }

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

export class EnumInputContext<T extends EnumInput<string, any>>
    extends AbstractNullableInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async getElement(): Promise<WidgetElement<T>> {
        return {default: await ValueOrAwaitableFn(this.config.default)};
    }

    async loadAndCheckNotNull(data: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
        if (!this.props.keys.has(data)) {
            throw new RpcError(`Invalid enum key ${data}`)
        }
        return {value: data}
    }


}


export const GenderInput = EnumInput(["male", "female"]);


