import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {assert} from "../common/assert";
import {defined, definedAt} from "../common/object/defined";
import {entries} from "../common/object/entries";
import {ExtractKeys} from "../common/typings";
import {EntityRelation} from "../typeorm/relations";
import {DataLoadMapValue} from "./DataCursor";
import {getEntityDataInfo} from "./getEntityDataInfo";

export type RowLoader<T = any> = (row: T, raw: object) => void;

export type EntityLoadMapObject<T> = {
    [K in ExtractKeys<Required<T>, object>]?:
    boolean | EntityLoadMap<T[K]>
};
export type EntityLoadMap<T> = undefined | boolean | EntityLoadMapObject<T>;

export function selectLoadMap<T>(
    leftQb: SelectQueryBuilder<T>,
    leftSchema: string,
    loadMap: DataLoadMapValue<T>,
    withColumns: boolean
): RowLoader | undefined {
    if (!loadMap)
        return undefined;
    const loaders: RowLoader[] = [];
    const schemaMetadata: EntityMetadata =
        defined(leftQb.expressionMap.aliases.find(alias => alias.name === leftSchema),
            () => `No alias "${leftSchema}".`)
            .metadata;

    assert(typeof schemaMetadata.target === "function");
    const schemaTarget = schemaMetadata.target;

    const propertyNameToLoader: Record<string, (raw: any) => any> = {};

    const loadMapObject: object | undefined =
        typeof loadMap === "object" ? loadMap : undefined;

    const entityDataInfo = getEntityDataInfo(schemaMetadata);

    for (let [key, relationLoadMap] of entries(loadMapObject)) {
        if (!relationLoadMap)
            continue;
        const relationMetadata = definedAt(
            entityDataInfo.propertyNameToOneRelationMetadata,
            key);
        const relation = new EntityRelation(leftQb.connection,
            schemaTarget,
            relationMetadata.propertyName,
            false);
        const rightSchema = relation.join("LEFT", leftQb, leftSchema);
        if (relationLoadMap) {
            const relationLoader = selectLoadMap(
                leftQb,
                rightSchema,
                relationLoadMap,
                true);
            relationLoader && loaders.push((row, raw) => {
                const relationRow = {};
                relationLoader(relationRow, raw)
                row[relationMetadata.propertyName] = relationRow;
            })
        }
    }

    if (withColumns) for (let column of schemaMetadata.columns) {
        if (column.relationMetadata)
            continue;
        const aliasName = leftSchema + '__' + column.propertyName;
        const transformer = entityDataInfo.propertyNameToTransformer[column.propertyName];

        propertyNameToLoader[column.propertyName] = raw =>
            transformer ? transformer.from(raw[aliasName]) :
                raw[aliasName];

        leftQb.expressionMap.selects.push({
            selection: leftQb.connection.driver.escape(
                leftSchema
            ) + '.' + leftQb.connection.driver.escape(
                column.databaseName
            ),
            aliasName
        })
    }

    if (withColumns || loaders.length)
        return (row, raw) => {
            if (withColumns) {
                for (let [propertyName, load] of entries(propertyNameToLoader)) {

                    row[propertyName] = load(raw);
                }
            }
            for (let loader of loaders) {
                loader(row, raw);
            }
        }
}


