import {Field, getField} from "./Field";

export type FieldDecorator<T = any> = <K extends string>(
    target: { constructor: Function } & Partial<Record<K, T>>,
    propertyKey: K
) => void;

export function FieldDecorator<T = any>(
    ...decorators: ((field: Field) => void)[]
): FieldDecorator<T> {
    return (target, propertyKey) => {
        for (let decorator of decorators) {
            decorator(getField(target.constructor, propertyKey))
        }

    }
}
