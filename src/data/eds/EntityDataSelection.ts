import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {mapArrayToObject} from "../../common/array/mapArrayToObject";
import {assert} from "../../common/assert";
import {definedAt} from "../../common/object/definedAt";
import {entries} from "../../common/object/entries";
import {Awaitable} from "../../common/typings";
import {QbDataExpTranslator} from "../../typeorm/exp/QbDataExpTranslator";
import {EntityRelation} from "../../typeorm/relations";
import {DataSelection} from "../DataSelection";
import {KeyObject} from "../KeyObject";
import {ArrayKey} from "./ArrayKey";
import {filterJoinColumnsByArrayKeys} from "./filterJoinColumnsByArrayKeys";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {getSchemaMetadata} from "./getSchemaMetadata";
import {QueryBuilderSelector} from "./QueryBuilderSelector";


export namespace EntityDataSelection {

    type RowContext = { row: object, raw: object, key: ArrayKey };


    type RowsContext = {
        rows: any[],
        keys: ArrayKey[],
        contexts: RowContext[]
    };


    export function select(
        qb: SelectQueryBuilder<any>,
        selector: QueryBuilderSelector,
        selection: DataSelection<any>,
        schema: string,
        prefix: string
    ) {
        const loaders: ((context: RowContext) => void)[] = [];

        const relationLoaders: ((context: RowsContext) =>
            Promise<(context: RowContext) => void>)[] = [];

        const entityMetadata = getSchemaMetadata(qb, schema);
        const entityDataInfo = getEntityDataInfo(entityMetadata);

        const hasPick = 'pick' in selection;
        const hasOmit = 'omit' in selection;
        const omitAll = hasOmit && (
            (<Extract<typeof selection, { omit }>>selection).omit === "all"
        );
        const pickKeys = hasPick && new Set((<Extract<typeof selection, { pick }>>selection).pick);
        const omitKeys = hasOmit && !omitAll && new Set((<Extract<typeof selection, { omit: any[] }>>selection).omit);


        if (hasPick && hasOmit)
            throw new Error(`Can't pick and omit in the some time`);

        const primaryColumnsLoaders = entityMetadata.primaryColumns.map(column =>
            selector.select(column.databaseName, prefix + 'key_' + column.propertyName,
                schema)
        )


        // TODO: if "type" column of TableInheritable is not excluded,
        // select also subtypes columns

        if (!omitAll) {
            for (const column of entityDataInfo.dataColumns) {
                if ((omitKeys && omitKeys.has(column.propertyName)) ||
                    (pickKeys && !pickKeys.has(column.propertyName)) ||
                    (selection.fields && (column.propertyName in selection.fields)))
                    continue;
                const loader = selector.select(
                    column.databaseName,
                    prefix + column.propertyName,
                    schema)

                loaders.push(context => {
                    context.row[column.propertyName] = loader(context.raw)
                })
            }
        }

        // if fields is {...}
        for (const [propertyName, exp] of entries(selection.fields)) {
            if (propertyName in entityDataInfo.propertyNameToRelationMetadata) {
                throw new Error(`Can't override relation by field "${propertyName}".`)
            }

            const loader = selector.select(
                QbDataExpTranslator.translate(qb, exp),
                prefix + propertyName
            )
            loaders.push(context => {
                context.row[propertyName] = loader(context.raw);
            })
        }

        // if relations is {...}
        for (const [propertyName, relationSelectionOrBoolean]
            of entries<boolean | DataSelection.RelationToOne<any>
            | DataSelection.RelationToMany<any>>(<any>selection.relations)) {


            const relationMetadata = definedAt(entityDataInfo.propertyNameToRelationMetadata,
                propertyName)


            if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {
                const relation = new EntityRelation(
                    qb.connection,
                    <Function>entityMetadata.target,
                    propertyName,
                    false
                )

                const relationSelection: DataSelection.RelationToOne<any> =
                    typeof relationSelectionOrBoolean === "boolean" ?
                        {notNull: relationSelectionOrBoolean} :
                        <DataSelection.RelationToOne<any>>relationSelectionOrBoolean;

                const relationSchema = relation.join("LEFT", qb, schema);

                // console.log({relationSchema});
                const relationLoader = select(
                    qb,
                    selector,
                    relationSelection,
                    relationSchema,
                    prefix + propertyName + '_'
                )

                // if is not nullable
                if (relationSelection.notNull) {
                    qb.andWhere(relation.right.entityMetadata.primaryColumns
                        .toSeq()
                        .map(column => `${relationSchema}.${
                            qb.connection.driver.escape(column.databaseName)
                        } IS NOT NULL`)
                        .join(' AND ')
                    )
                }

                loaders.push(context => {
                    const relationContext = relationLoader.getRowContext({}, context.raw);
                    context.row[propertyName] = relationContext?.row || null;
                })
            } else if (relationMetadata.isManyToMany || relationMetadata.isOneToMany) {

                const relation = new EntityRelation(
                    qb.connection,
                    <Function>entityMetadata.target,
                    propertyName,
                    true
                )

                const relationSelection: DataSelection.RelationToMany<any> =
                    typeof relationSelectionOrBoolean === "boolean" ?
                        {} :
                        <DataSelection.RelationToMany<any>>relationSelectionOrBoolean;

                assert(relation.left.entityType !== entityMetadata.target);


                relationLoaders.push(async (context) => {
                    const relationLoader = await getRelationsLoader(entityMetadata,
                        relation,
                        context.keys,
                        relationSelection);
                    return context => {
                        context.row[propertyName] =
                            relationLoader(context.key);


                    }
                })

            } else {
                throw new Error(`Not support ${relationMetadata.relationType}`)
            }


        }


        return {
            getRowContext,
            getRows,
            getRowsContext,
            primaryColumnsLoaders
        }


        function getRowsContext(raws: any[]): RowsContext {
            const keys: ArrayKey[] = [];
            const rows: any [] = [];
            const contexts: RowContext[] = [];
            for (const raw of raws) {
                const row = {};
                const context = getRowContext(row, raw)
                if (context) {
                    keys.push(context.key)
                    rows.push(context.row);
                    contexts.push(context)
                }
            }
            return {
                rows,
                keys,
                contexts
            };
        }


        async function getRows() {
            const context = await getRowsContext(
                await qb.getRawMany()
            );
            await loadRelations(context);
            return context.rows
        }


        async function loadRelations(context: RowsContext) {
            const loaders:
                ((context: RowContext) => Awaitable)[] = [];
            for (const relationLoader of relationLoaders) {
                loaders.push(await relationLoader(context))
            }
            for (let rowContext of context.contexts) {
                for (const loader of loaders) {
                    await loader(rowContext)
                }
            }
        }


        function getRowContext(row: any, raw: object): RowContext | undefined {
            const key: ArrayKey = [];

            for (const keyLoader of primaryColumnsLoaders) {
                const value = keyLoader(raw);
                if (value == null)
                    return;
                key.push(keyLoader(raw));
            }

            row.$key = primaryColumnsLoaders.length === 1 ?
                String(primaryColumnsLoaders[0](raw)) :
                KeyObject.stringify(
                    mapArrayToObject(entityMetadata.primaryColumns,
                        (column, index) => [
                            column.propertyName,
                            key[index]
                        ])
                )

            const context = {row, raw, key};
            for (const loader of loaders) {
                loader(context);
            }
            return context;

        }
    }


    export async function getRelationsLoader(
        entityMetadata: EntityMetadata,
        relation: EntityRelation,
        keys: ArrayKey[],
        selection: DataSelection.RelationToMany<any>,
    ): Promise<(key: ArrayKey) => any[]> {
        const {connection} = entityMetadata;


        const qb = connection
            .getRepository(relation.left.entityType)
            .createQueryBuilder();

        const selector = new QueryBuilderSelector(qb);

        let joinColumns: ColumnMetadata[];
        let joinSchema: string;

        if (relation.relationMetadata.isOneToMany) {
            joinColumns = relation.left.joinColumns;
            joinSchema = qb.alias;
        } else if (relation.relationMetadata.isManyToMany) {

            joinColumns = relation.right.joinColumns;

            const rightSchema = relation.getRightSchema(qb.alias);
            joinSchema = rightSchema + '_join';

            qb.innerJoin(
                relation.ownerRelationMetadata.joinTableName,
                joinSchema,
                relation.getJoinToTableCondition(
                    qb.alias,
                    joinSchema,
                )
            )

        } else {
            throw new Error(`Not support ${relation.relationMetadata.relationType}.`)
        }

        qb.andWhere(
            filterJoinColumnsByArrayKeys(qb, entityMetadata,
                joinSchema,
                joinColumns,
                keys)
        )


        const keysLoaders = joinColumns.map(column =>
            selector.select(column.databaseName, 'f_' + column.propertyName,
                joinSchema))


        const selectionLoader = select(
            qb,
            selector,
            selection || {},
            qb.alias,
            "r_"
        )

        if (selection.filter)
            qb.andWhereExp(selection.filter);


        let sqlFilter = '';
        if (selection.skip || selection.take) {


            if (selection.skip && selection.take) {
                sqlFilter = `_rec._index BETWEEN ${
                    selection.skip + 1
                } AND ${
                    selection.skip + selection.take + 1
                }`
            } else if (selection.skip) {
                sqlFilter = `_rec._index > ${selection.skip}`
            } else if (selection.take) {
                sqlFilter = `_rec._index <= ${selection.take}`
            }
        }

        if (sqlFilter || selection.order) {

            const sqlOrder = selection.order?.map(order => {
                return `${QbDataExpTranslator.translate(qb, order.by)}${
                    ((order.sort === "ASC") || (order.sort === "DESC")) ?
                        ` ${order.sort}` : ""
                }${
                    order.nulls === "FIRST" ? "NULLS FIRST" :
                        order.nulls === "LAST" ? "NULLS LAST" :
                            undefined
                }`
            }).join(", ")

            if (sqlFilter || sqlOrder) {
                selector.select(`row_number() over (PARTITION BY ${
                    joinColumns.toSeq()
                        .map(column => `${joinSchema}.${column.databaseName}`)
                        .join(", ")
                }${sqlOrder ? " ORDER BY " + sqlOrder : ""})`, '_index')
            }
        }


        let [query, params] = qb.getQueryAndParameters();

        if (sqlFilter) {
            query = `SELECT * FROM (${query}) _rec WHERE ${sqlFilter}`;
        }
        const keyToSubRows = {};
        const context = await selectionLoader.getRowsContext(
            await connection.query(query, params)
        );


        for (const rowContext of context.contexts) {
            const rightKey = keysLoaders.map(loader => loader(rowContext.raw));
            ArrayKey.addToArray(keyToSubRows, rightKey,
                rowContext.row);
        }

        return rowKey => ArrayKey.getArray(keyToSubRows, rowKey) || []
    }
}


/*


 */
