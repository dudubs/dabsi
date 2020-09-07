import {NoRpc} from "../NoRpc";
import {RpcConfig, RpcError} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {Input, InputCheckResult, InputType, TInput} from "./Input";
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
        getContextClass: () => EnumInputContext
    })
}

export class EnumInputContext<T extends EnumInput<string, any>>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return null
    }

    async getElement(): Promise<WidgetElement<T>> {
        return {default: await ValueOrAwaitableFn(this.config.default)};
    }

    async loadAndCheck(key: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        if (typeof key === "string") {
            if (!this.props.keys.has(key)) {
                throw new RpcError(`Invalid enum key ${key}`)
            }
            return {value: key}
        }
        if (!this.props.nullable)
            return {error: "REQUIRED"}
        return {value: undefined}
    }

}


export const GenderInput = EnumInput(["male", "female"]);


