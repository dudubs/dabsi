import {WeakMapFactory} from "../common/map/mapFactory";
import {Type} from "../common/typings";
import {Default} from "./Default";
import {Field, getField} from "./Field";


const forwardTypes = new WeakMap<Field, () => Function>();

export function getFieldForwardType(field: Field): Function | undefined {
    return forwardTypes.get(field)?.();
}

export const getFieldDesignType = WeakMapFactory((field: Field): Function | undefined => {
    return Reflect.getMetadata("design:type", field.target.prototype, field.propertyKey)
});

export const getFieldDesignOrForwardType = WeakMapFactory((field: Field): Function | undefined => {
    const type = getFieldDesignType(field) ?? getFieldForwardType(field);
    type?.[buildFieldDesignOrForwardType]?.(field);
    return type;
});

export function Forward<T>(
    getType: () => Type<T>
): <K extends string>(target: Partial<Record<K,
    T | Record<string, T> | Map<any, T> | Iterable<T>>>, propertyKey: K) => void {
    return (target, propertyKey) => {

        forwardTypes.set(
            getField(target.constructor, propertyKey),
            getType
        )

    }
}


export const buildFieldDesignOrForwardType = Symbol();

declare global {
    interface Function {
        [buildFieldDesignOrForwardType](field: Field): void;
    }
}
Array[buildFieldDesignOrForwardType] = function (field) {
    if (!Default.get(field)) {
        Default<any>(() => [])(field.target.prototype, field.propertyKey)
    }
}
