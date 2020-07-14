import {WeakMapFactory} from "../../common/map/mapFactory";
import {Field, getField} from "../Field";
import {getBaseFunction} from "./getBaseFunction";

export type ModelMetadata = {
    children: ModelMetadata[],
    fields: Field[];
};
export const getModelMetadata = WeakMapFactory((target: Function): ModelMetadata => {
    const base = getBaseFunction(target);
    const baseModel = base && getModelMetadata(base);
    const children: ModelMetadata[] = [];

    const fields = [
        ...baseModel?.fields || [],

    ];


    const model = {fields, children};
    baseModel?.children.push(model)
    return model
})
