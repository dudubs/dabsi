import "reflect-metadata";
import {touchMap} from "../common/map/touchMap";
import {defined} from "../common/object/defined";
import {FieldDecorator} from "./FieldDecorator";


export type Field = {
    target: Function,
    propertyKey: string
}


export const targetToPropertyKeyToField = new WeakMap<Function, Map<string, Field>>();

export function getField(target: Function, propertyKey: string): Field {
    return defined(
        targetToPropertyKeyToField.get(target)?.get(propertyKey),
        () => `No field ${target.name}.${propertyKey}`
    );
}


export function Field(
    ...decorators: FieldDecorator[]
): FieldDecorator {
    return ({constructor: target}, propertyKey): void => {

        for (let base = Object.getPrototypeOf(target);
             typeof base === "function";
             base = Object.getPrototypeOf(base)) {

            if (targetToPropertyKeyToField.get(base)?.has(propertyKey))
                throw new Error(`Can't override Field ${base.name}.${propertyKey} at ${target.name}.`)

        }


        const field = ({target, propertyKey});
        touchMap(targetToPropertyKeyToField, target, () => new Map())
            .set(propertyKey, field)

        decorators.forEach(decorator => {
            decorator(target, propertyKey)
        })
    }
}


