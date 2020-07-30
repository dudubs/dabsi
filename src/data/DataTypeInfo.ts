import {touchMap} from "../common/map/touchMap";
import {mapObject} from "../common/object/mapObject";
import {Type} from "../common/typings";
import {DataUnion} from "./DataUnion";

export type DataTypeInfo = {
    type: Type<any>,
    typePropertyName?: string;
    children?: Record<string, DataTypeInfo>;
    relations?: Record<string, DataTypeInfo>;
};
export namespace DataTypeInfo {

    export const map = new WeakMap();

    function create(unionOrType) {

        if (DataUnion.isDataUnion(unionOrType)) {

            const relations = mapObject(unionOrType.unionRelations, get);

            return {
                type: unionOrType.unionType,
                relations,
                typePropertyName: unionOrType.unionTypePropertyName,
                children: mapObject(unionOrType.unionChildren, get),
            }
        }

        return {type: unionOrType}
    }

    export function get(unionOrType): DataTypeInfo {
        return touchMap(map, unionOrType, create)
    }


}
