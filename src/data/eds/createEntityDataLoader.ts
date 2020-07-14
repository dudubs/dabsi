import {entries} from "../../common/object/entries";
import {keys} from "../../common/object/keys";
import {mapObject} from "../../common/object/mapObject";
import {RelationMap} from "../DataCursor";
import {DataItem} from "../DataItem";
import {EntityDataCursor} from "./EntityDataCursor";
import {EntityDataSource} from "./EntityDataSource";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {QueryBuilderSelector} from "./QueryBuilderSelector";
import {selectRelations} from "./selectRelations";


export function createEntityDataLoader(source: EntityDataSource<any>) {

    ////
    const qb = EntityDataCursor.createQueryBuilder(
        source.entityConnection.cursor,
        source.entityConnection.repository
    );
    for (let {by, sort, nulls} of source.cursor.order ?? []) {
        qb.addOrderByExp(
            by,
            sort === "DESC" ? "DESC" : "ASC",
            nulls === "FIRST" ? "NULLS FIRST" : "NULLS LAST"
        )
    }

    if (source.cursor.skip) {
        qb.skip(source.cursor.skip);
    }
    const take = Math.min(source.cursor.take ?? 100, 100)
    if (take) {
        qb.take(take);
    }

    qb.expressionMap.selects.length = 0;
    // select key columns

    const fieldNameToLoader: Record<string, (raw: any) => any> = {};
    const selector =
        QueryBuilderSelector.get(qb);

    const relationMap: RelationMap<any> = {...source.cursor.relationMap};
    const selectedFields: Record<string, any> = {
        ...source.cursor.fields
    };

    if (source.cursor.excludeAll) {
        for (let key of keys(relationMap)) {
            const exp = source.cursor.fields[key];
            if (key === exp) continue;
            delete relationMap[key];
        }
    } else {
        const defaultFields: Record<string, any> = {};
        for (const c of source.entityConnection.repository.metadata.columns) {
            if (!c.relationMetadata) {
                defaultFields[c.propertyName] = c.propertyName;
            }
        }
        for (const key of source.cursor.exclude) {
            delete relationMap[key];
            delete defaultFields[key]
        }
        Object.assign(selectedFields, defaultFields);
    }


    const entityDataInfo = getEntityDataInfo(source.entityConnection.repository.metadata);

    // select fields
    for (let [fieldName, exp] of entries(selectedFields)) {
        const selection = qb.exp(<any>exp);
        const aliasName = '_' + fieldName;
        selector.select(selection, aliasName);

        const transformer =
            typeof exp === "string" &&
            entityDataInfo.propertyNameToTransformer[exp];

        fieldNameToLoader[fieldName] = raw => {
            raw = selector.load(raw, aliasName);
            return transformer ? transformer.from(raw) : raw;
        };

    }

    const loadRelations = selectRelations(qb, qb.alias, relationMap, false);

    const rowType = source.entityConnection.cursor.entityType.prototype;

    return {qb, load,}


    // DataEntityAt(entity, "notes")

    async function* load<T>(): AsyncIterableIterator<DataItem<T>> {
        const raws = await qb.getRawMany();
        for (const raw of raws) {
            const row: any = mapObject(fieldNameToLoader, load =>
                load(raw)
            );
            loadRelations(row, raw);
            Object.setPrototypeOf(row, rowType);
            yield row
        }
    }


}
