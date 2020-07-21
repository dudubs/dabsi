import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {mapArrayToObject} from "../../../common/array/mapArrayToObject";
import {definedAt} from "../../../common/object/definedAt";
import {entries} from "../../../common/object/entries";
import {pick} from "../../../common/object/pick";
import {Type} from "../../../common/typings";
import {QbDataExpTranslator} from "../../../typeorm/exp/QbDataExpTranslator";
import {DataSelection} from "../../DataSelection";
import {AnyDataUnion, DataUnion} from "../../DataUnion";
import {KeyObject} from "../../KeyObject";
import {ArrayKey} from "../ArrayKey";
import {getEntityDataInfo} from "../getEntityDataInfo";
import {QueryBuilderSelector} from "../QueryBuilderSelector";

export namespace EntityDataSelector {
    import hasOmitKeys = DataSelection.hasOmitKeys;
    import hasPickKeys = DataSelection.hasPickKeys;
    import isOmitAll = DataSelection.isOmitAll;
    import ChildType = DataUnion.ChildType;
    type RowContext = { row: object, raw: object, key: ArrayKey };
    type RowsContext = {
        keys: ArrayKey[],
        rows: any[],
        contexts: RowContext[]
    };
    type RowLoader = (context: RowContext) => void;

    export function select(
        typeOrUnion: AnyDataUnion | Type<any>,
        qb: SelectQueryBuilder<any>,
        selector: QueryBuilderSelector,
        selection: DataSelection<any>,
        schema: string,
        prefix: string
    ) {
        const {connection} = qb;
        const union = 'unionType' in typeOrUnion ? typeOrUnion : undefined;
        const entityType = <Function>(union?.unionType ?? typeOrUnion);


        const entityMetadata = connection.getMetadata(entityType);
        const entityInfo = getEntityDataInfo(entityMetadata);

        const discriminatorValueLoader = union && selector
            .selectColumn(prefix, schema,
                entityMetadata.discriminatorColumn!.databaseName);

        const discriminatorValueToLoader:
            Record<string, ReturnType<typeof selectChild>> = {};

        const primaryColumnsLoaders = entityMetadata.primaryColumns.map(column =>
            selector.selectColumn(prefix, schema, column.databaseName)
        );

        const defaultLoader = selectChild(
            entityMetadata,
            selection,
            undefined,
            new Set(
                DataSelection.selectKeys(selection,
                    entityInfo.nonRelationColumnsPropertyName)
            )
        );

        for (const [childKey, childTypeOrUnion] of entries<ChildType<any>>(union?.unionChildren)) {
            const childUnion = 'unionType' in childTypeOrUnion ? childTypeOrUnion : undefined;
            const childType = childUnion?.unionType ?? childTypeOrUnion;
            const childMetadata = connection.getMetadata(childType);

            const childSelection: DataSelection<any> = selection.unions?.[childKey] ?? {};

            const childEntityInfo = getEntityDataInfo(childMetadata);

            const pickKeys: Set<string> = new Set();

            if (hasPickKeys(selection)) {
                if (hasPickKeys(childSelection)) {
                    // pick-keys & pick
                    addAll(pickKeys, selection.pick);
                    addAll(pickKeys, childSelection.pick);
                } else if (hasOmitKeys(childSelection)) {
                    // pick-keys & omit-keys
                    addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, childSelection.omit);
                    deleteAll(pickKeys, entityInfo.nonRelationColumnsPropertyName);
                    const omitKeys = new Set(childSelection.omit);
                    addAll(pickKeys, selection.pick
                        .toSeq()
                        .filter(key => !omitKeys.has(key))
                    );

                } else if (isOmitAll(childSelection)) {
                    // pick-keys & omit-all
                    addAll(pickKeys, selection.pick)
                } else {
                    // pick-keys & pick-all
                    addAll(pickKeys, selection.pick);
                }
            } else if (hasOmitKeys(selection)) {
                if (hasPickKeys(childSelection)) {
                    // omit-keys & pick-keys
                    addAll(pickKeys, childSelection.pick);
                    const omitKeys = new Set(childSelection.pick);
                    deleteAll(pickKeys, selection.omit.toSeq()
                        .filter(key=>!omitKeys.has(key)));
                } else if (hasOmitKeys(childSelection)) {
                    // omit-keys & omit-keys
                    addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, selection.omit);
                    deleteAll(pickKeys, childSelection.omit);
                } else if (isOmitAll(childSelection)) {
                    // omit-keys & omit-all
                    addAll(pickKeys, entityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, selection.omit);

                } else {
                    // omit-keys & pick-all
                    addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, selection.omit);
                }
            } else if (isOmitAll(selection)) {
                if (hasPickKeys(childSelection)) {
                    // omit-all & pick-keys
                    addAll(pickKeys, childSelection.pick);
                } else if (hasOmitKeys(childSelection)) {
                    // omit-all & omit-keys
                    addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, entityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, childSelection.omit);

                } else if (isOmitAll(childSelection)) {
                    // omit-all & omit-all
                } else {
                    // omit-all & pick-all
                    addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
                    deleteAll(pickKeys, entityInfo.nonRelationColumnsPropertyName);
                }
            } else {
                // pick-all
                addAll(pickKeys, childEntityInfo.nonRelationColumnsPropertyName);
            }


            discriminatorValueToLoader[childMetadata.discriminatorValue!] =
                selectChild(childMetadata, childSelection, childKey, pickKeys);
        }


        return {
            defaultLoader,
            discriminatorValueLoader,
            discriminatorValueToLoader,
            primaryColumnsLoaders,
            loadOneRaw,
            loadManyRaws,
            loadMany
        }

        async function loadMany(): Promise<any[]> {
            const context = await loadManyRaws(await qb.getRawMany());
            // TODO: loadRelations(...)
            return context.rows
        }

        function loadManyRaws(raws: object[]): RowsContext {
            const keys: ArrayKey[] = [];
            const rows: any[] = [];
            const contexts: RowContext[] = [];

            for (const raw of raws) {
                const context = loadOneRaw(raw);
                if (context) {
                    keys.push(context.key);
                    rows.push(context.row);
                    contexts.push(context);
                }
            }
            return {rows, keys, contexts}
        }


        function loadOneRaw(raw: object): RowContext | undefined {

            const key: ArrayKey = [];
            for (const loader of primaryColumnsLoaders) {
                const value = loader(raw);
                if (value == null)
                    return;
                key.push(value);
            }
            const row: any = {};
            row.$key = primaryColumnsLoaders.length === 1 ?
                String(primaryColumnsLoaders[0](raw)) :
                KeyObject.stringify(
                    mapArrayToObject(entityMetadata.primaryColumns,
                        (column, index) => [
                            column.propertyName,
                            key[index]
                        ])
                );


            const context: RowContext = {row, raw, key};

            if (discriminatorValueLoader) {
                const discriminatorValue = discriminatorValueLoader(raw);
                (discriminatorValueToLoader[discriminatorValue]
                    ?? defaultLoader).loadOneRaw(context);

            } else {
                defaultLoader.loadOneRaw(context);
            }

            return context;

        }


        function selectChild(
            entityMetadata: EntityMetadata,
            selection: DataSelection<any>,
            childKey: string | undefined,
            pickKeys: Set<string>
        ) {

            const loaders: RowLoader[] = [];

            const entityInfo = getEntityDataInfo(entityMetadata);


            for (const columnPropertyName of pickKeys) {
                const column = definedAt(entityInfo.propertyNameToColumn, columnPropertyName);
                if (selection.fields && (column.propertyName in selection.fields))
                    continue;
                const loader = selector.selectColumn(
                    prefix,
                    schema,
                    column.databaseName,
                );
                loaders.push(context => {
                    if (column.transformer)
                        throw new Error(`Not support yet.`)
                    context.row[column.propertyName] = loader(context.raw);
                })
            }


            for (const [propertyName, exp] of entries(selection.fields)) {
                if (propertyName in entityInfo.propertyNameToRelationMetadata) {
                    throw new Error(`Can't override relation by field "${propertyName}".`)
                }

                const loader = selector.select(
                    new QbDataExpTranslator(
                        qb,
                        schema,
                        qb,
                        (childKey === undefined) ? union : undefined
                    ).translate(exp),
                    prefix + `x_${childKey}_${propertyName}`
                );

                loaders.push(context => {
                    context.row[propertyName] = loader(context.raw)
                })
            }

            return {
                loaders,
                loadOneRaw
            }

            function loadOneRaw(context: RowContext) {
                for (const loader of loaders) {
                    loader(context)
                }
            }

        }

    }


}

function addAll<T>(set: { add(value: T) }, values: Iterable<T>) {
    for (const value of values) {
        set.add(value)
    }
}

function deleteAll<T>(set: { delete(value: T) }, values: Iterable<T>) {
    for (const value of values) {
        set.delete(value)
    }
}
