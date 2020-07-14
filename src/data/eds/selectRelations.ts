import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {assert} from "../../common/assert";
import {defined} from "../../common/object/defined";
import {definedAt} from "../../common/object/definedAt";
import {entries} from "../../common/object/entries";
import {ExtractKeys} from "../../common/typings";
import {EntityRelation} from "../../typeorm/relations";
import {DataLoadMapValue} from "../DataCursor";
import {EntityDataKey} from "./EntityDataKey";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {QueryBuilderSelector} from "./QueryBuilderSelector";


export type RowLoader<T = any> = (row: T, raw: object) => void;

export type EntityLoadMapObject<T> = {
    [K in ExtractKeys<Required<T>, object>]?:
    boolean | EntityLoadMap<T[K]>
};
export type EntityLoadMap<T> = undefined | boolean | EntityLoadMapObject<T>;

export function selectRelations<T>(
    leftQb: SelectQueryBuilder<T>,
    schema: string,
    relationMap: DataLoadMapValue<T>,
    withColumns: boolean
): RowLoader {
    if (!relationMap)
        relationMap = {};

    const loaders: RowLoader[] = [];
    const schemaMetadata: EntityMetadata =
        defined(leftQb.expressionMap.aliases
            .find(alias => alias.name === schema), () =>
            `No alias "${schema}".`)
            .metadata;

    assert(typeof schemaMetadata.target === "function");

    const schemaTarget = schemaMetadata.target;

    const propertyNameToLoader: Record<string, (raw: any) => any> = {};

    const relationMapObject: object | undefined =
        typeof relationMap === "object" ? relationMap : undefined;

    const entityDataInfo = getEntityDataInfo(schemaMetadata);

    for (let [key, relationLoadMap] of entries(relationMapObject)) {
        if (!relationLoadMap)
            continue;

        const relationMetadata =
            definedAt(entityDataInfo.propertyNameToOneRelation, key);

        const relation = new EntityRelation(leftQb.connection,
            schemaTarget,
            relationMetadata.propertyName,
            false);

        const rightSchema = relation.join("LEFT", leftQb, schema);
        if (relationLoadMap) {
            const loadRelations = selectRelations(
                leftQb,
                rightSchema,
                relationLoadMap,
                true);
            loaders.push((row, raw) => {
                const relationRow = {};
                loadRelations(relationRow, raw)
                row[relationMetadata.propertyName] = relationRow;
            })
        }
    }

    const selector = QueryBuilderSelector.get(leftQb)


    const keyLoader = EntityDataKey.select(
        schemaMetadata,
        selector,
        schema
    );

    if (withColumns) {

        for (const column of schemaMetadata.columns) {

            if (column.relationMetadata)
                continue;

            const aliasName = schema + '__' + column.propertyName;
            const transformer =
                entityDataInfo.propertyNameToTransformer[column.propertyName];

            propertyNameToLoader[column.propertyName] = raw => {
                raw = selector.load(raw, aliasName)
                return transformer ? transformer.from(raw) :
                    raw;
            };

            selector.select(column.databaseName, aliasName, schema)
        }

        loaders.push(((row, raw) => {
            for (let [propertyName, load] of entries(propertyNameToLoader)) {
                row[propertyName] = load(raw);
            }
        }))
    }

    return (row, raw) => {
        row.$key = keyLoader(raw)
        for (const loader of loaders) {
            loader(row, raw);
        }
    }

}


