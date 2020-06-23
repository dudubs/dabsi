import {WeakMapFactory} from "../common/map/mapFactory";
import {entries} from "../common/object/entries";
import {buildFieldMetadataSymbol, FieldMetadata, getFieldMetadata, getFieldMetadataBuilders} from "./Field";
import {formatValidation, Validation} from "./JSONSchema";


export function isModel(target: Function) {
    return getFieldMetadataBuilders.map.has(target);
}


export const getModelFields = WeakMapFactory((target: Function) => {
    const baseTarget = Object.getPrototypeOf(target);
    const baseFields = (typeof baseTarget === "function") ?
        getModelFields(baseTarget) : {};
    const fields: Record<string, FieldMetadata> = {...baseFields};
    for (let prop of getFieldMetadataBuilders.map.get(target)
        ?.map?.keys() || []) {
        fields[prop] = getFieldMetadata(target)(prop);
    }
    return fields;

})

export function validateModel(target: Function, value: any): Validation {
    if (isModel(target)) {
        if (!value)
            return () => `Expected to object`
        for (const [key, metadata] of entries(getModelFields(target))) {
            const result = metadata.validate(value[key])
            if (result)
                return formatValidation(result, msg => `At ${key}: ${msg}`);
        }
    } else {
        if (!(value instanceof target)) {
            return () => `Expected to instance of ${target.name}`
        }
    }
}

export function createEmptyModel(target: Function) {
    if (isModel(target)) {
        const o = {};
        for (let [key, metadata] of entries(getModelFields(target))) {
            o[key] = metadata.createEmpty?.();
        }
        return o;
    } else {
        throw new Error(`Cant' create empty ${target.name}.`)
    }
}

export function ModelFactory(target) {
    return () => createEmptyModel(target)
}


Boolean[buildFieldMetadataSymbol] = function (metadata: FieldMetadata<boolean>) {
    metadata.createEmpty = () => false;
}

Array[buildFieldMetadataSymbol] = function (metadata: FieldMetadata<any[]>, options, type) {
    metadata.createEmpty = () => [];
    metadata.clone = value => [...value];

    type && metadata.validators.push((value: any[]) => {
        for (let item of value) {
            const result = validateModel(type, value);
            if (result)
                return result;
        }
    })
}
