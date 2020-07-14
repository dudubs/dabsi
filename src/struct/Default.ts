import {Field} from "./Field";
import {FieldDecorator} from "./FieldDecorator";


const map = new WeakMap<Field, (field: Field) => any>();


export function Default<T>(factory: ((field: Field) => T)):
    <K extends string>(target: Partial<Record<K, T>>, propertyKey: K) => void {
    return FieldDecorator(field => {
        map.set(field,
            factory
        )
    })
}


Default.get = function (field: Field) {
    return map.get(field)
}
