/*

FieldFlag()

 */
import {Field} from "./Field";
import {FieldDecorator} from "./FieldDecorator";

export type FieldFlag<T> =
    { get(field: Field): boolean } & (() => FieldDecorator<T>);

export function FieldFlag<T=any>(): FieldFlag<T> {

    const fields = new WeakSet<Field>();

    Wrapper.get = field => fields.has(field)

    return Wrapper

    function Wrapper() {
        return FieldDecorator(field => {
            fields.add(field)
        })
    }
}
