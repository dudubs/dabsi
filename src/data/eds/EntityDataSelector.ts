import {EntityMetadata, SelectQueryBuilder} from "typeorm";
import {mapArrayToObject} from "../../common/array/mapArrayToObject";
import {definedAt} from "../../common/object/definedAt";
import {entries} from "../../common/object/entries";
import {mapObject} from "../../common/object/mapObject";
import {Awaitable} from "../../common/typings";
import {DataExp} from "../../json-exp/DataExp";
import {QbDataExpTranslator} from "../../typeorm/exp/QbDataExpTranslator";
import {EntityRelation} from "../../typeorm/relations";
import {DataOrder} from "../DataOrder";
import {AnyDataSelection, DataSelection} from "../DataSelection";
import {DataTypeInfo} from "../DataTypeInfo";
import {KeyObject} from "../KeyObject";
import {getEntityDataInfo} from "./getEntityDataInfo";
import {QueryBuilderSelector} from "./QueryBuilderSelector";


export namespace EntityDataSelector {


    const defaultChildKey = "";

    export function selectCursor(
        typeInfo: DataTypeInfo,
        qb: SelectQueryBuilder<any>,
        selector: QueryBuilderSelector,
        selection: AnyDataSelection,
        cursor: {
            skip?: number,
            take?: number,
            order?: DataOrder<any>[],
            filter?: DataExp<any>

        }
    ): ReturnType<typeof select> {

        const loader = select(
            typeInfo,
            qb,
            selector,
            selection,
            qb.alias
        );
        const translator = new QbDataExpTranslator(typeInfo, qb, qb.alias, qb);

        if (cursor.skip)
            qb.skip(cursor.skip);
        if (cursor.take)
            qb.take(cursor.take);
        if (cursor.filter !== undefined)
            qb.andWhere(translator.translate(cursor.filter))

        cursor.order?.forEach(order => {
            qb.addOrderBy(
                translator.translate(order.by),
                order.sort === "DESC" ? "DESC" :
                    order.sort === "ASC" ? "ASC" : undefined,
                order.nulls === "FIRST" ? "NULLS FIRST" :
                    order.nulls === "LAST" ? "NULLS LAST" : undefined
            )
        })
        return loader
    }

    export function select(
        typeInfo: DataTypeInfo,
        qb: SelectQueryBuilder<any>,
        selector: QueryBuilderSelector,
        selection: AnyDataSelection,
        schema: string,/* is necessary? ?*/
    ) {
        type RowContext = {
            row: object, raw: object,
            objectKey: object
        };
        type RowLoader = (context: RowContext) => Awaitable;


        const {connection} = qb;


        const entityMetadata = connection.getMetadata(typeInfo.type);
        const entityInfo = getEntityDataInfo(entityMetadata);

        const discriminatorValueLoader = entityMetadata.discriminatorColumn
            ? selector.selectColumn(
                schema, entityMetadata.discriminatorColumn.databaseName) : undefined;

        const discriminatorValueToChildKey: Record<string, string> = {};


        const singlePrimaryColumn = entityMetadata.primaryColumns.length === 1 ?
            entityMetadata.primaryColumns[0] : undefined;
        const objectKeyLoaders = mapArrayToObject(
            entityMetadata.primaryColumns,
            column => [column.propertyName,
                selector.selectColumn(schema, column.databaseName)
            ]
        )

        const entityKeys = entityInfo.nonRelationColumnKeys;

        // TODO: DO NOT.
        const defaultLoader = selectChild(
            DataTypeInfo.get(typeInfo.type),
            entityMetadata,
            defaultChildKey,
            new Set(selection.pick || entityKeys),
            selection.fields || {},
            <any>selection.relations || {}
        );
        const childKeyToLoaders:
            Record<string, ReturnType<typeof selectChild>> = {
            [defaultChildKey]: defaultLoader
        };

        for (const [childKey, childTypeInfo] of entries<DataTypeInfo>(typeInfo.children)) {
            const childMetadata = connection.getMetadata(childTypeInfo.type);
            let childSelection: AnyDataSelection.ToOneOrMany =
                selection.children?.[childKey] ?? {};

            childSelection = <any>DataSelection.merge(selection, childSelection);

            const childEntityInfo = getEntityDataInfo(childMetadata);


            discriminatorValueToChildKey[childMetadata.discriminatorValue!] = childKey;


            childKeyToLoaders[childKey] = selectChild(
                childTypeInfo,
                childMetadata,
                childKey,
                new Set(childSelection.pick ?? childEntityInfo.nonRelationColumnKeys), {
                    // ...selection.fields,
                    ...childSelection.fields
                }, {
                    // ...<any>selection.relations,
                    ...childSelection.relations
                });
        }


        return {
            defaultLoader,
            discriminatorValueLoader,
            discriminatorValueToChildKey,
            childKeyToLoaders,
            loadOneRaw,
            loadMany
        }

        async function loadMany(): Promise<any[]> {

            const rows: any[] = [];

            // console.log(qb.clone().select(`1`).getQueryAndParameters());
            for (const raw of await qb.getRawMany()) {
                const context = await loadOneRaw(raw);
                context && rows.push(context.row);
            }
            // TODO: loadRelations(...)
            return rows;
        }


        async function loadOneRaw(raw: object): Promise<RowContext | undefined> {


            const objectKey: object = mapObject(objectKeyLoaders, loader => loader(raw));

            const row: any = {};

            row.$key =
                singlePrimaryColumn ?
                    String(objectKey[singlePrimaryColumn.propertyName]) :
                    KeyObject.stringify(
                        objectKey
                    );


            const discriminatorValue = discriminatorValueLoader?.(raw);
            const childKey =
                discriminatorValueToChildKey[discriminatorValue] ?? defaultChildKey;

            const loaders = definedAt(childKeyToLoaders, childKey);

            const context = {
                row, raw, objectKey
            };
            for (const rowLoader of loaders) {
                await rowLoader(context)
            }
            return context;
        }


        function selectChild(
            childTypeInfo: DataTypeInfo,
            childEntityMetadata: EntityMetadata,
            childKey: string,
            selectedKeys: Set<string>,
            fields: Record<string, DataExp<any>>,
            relations:
                Record<string, boolean | AnyDataSelection.ToOneOrMany>
        ) {

            const loaders: RowLoader[] = [];

            const childEntityInfo = getEntityDataInfo(childEntityMetadata);

            // select non-relations-columns
            for (const columnPropertyName of selectedKeys) {

                const column = definedAt(childEntityInfo.propertyNameToColumn, columnPropertyName);
                if (column.propertyName in fields)
                    continue;

                const loader = selector.selectColumn(schema, column.databaseName,);
                loaders.push(async context => {

                    let value = await loader(context.raw);

                    if (Array.isArray(column.transformer)) {
                        for (let valueTransformer of column.transformer) {
                            value = valueTransformer.from(value);
                        }
                    } else if (column.transformer) {
                        value = column.transformer.from(value)
                    }
                    context.row[columnPropertyName] = value;
                })
            }

            // select fields
            for (const [propertyName, exp] of entries(fields)) {
                if (propertyName in childEntityInfo.propertyNameToRelationMetadata) {
                    throw new Error(`Can't override relation by field "${propertyName}".`)
                }
                const loader = selector.select(
                    new QbDataExpTranslator(
                        childTypeInfo,
                        qb,
                        schema,
                        qb,
                    ).translate(exp),
                    `${schema}${childKey ? `_as_${childKey}` : ''}_x_${propertyName}`
                );

                loaders.push(context => {

                    context.row[propertyName] = loader(context.raw)
                })
            }

            // select relations
            for (let [propertyName, relationSelectionOrBoolean]
                of entries<boolean | AnyDataSelection.ToOneOrMany>(relations)) {

                if (!relationSelectionOrBoolean)
                    continue;

                const relationMetadata = definedAt(childEntityInfo.propertyNameToRelationMetadata,
                    propertyName);


                if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {

                    const relation = new EntityRelation(
                        qb.connection,
                        <Function>childEntityMetadata.target,
                        propertyName,
                        false
                    );


                    const relationTypeInfo = childTypeInfo.relations?.[propertyName] ||
                        DataTypeInfo.get(relation.right.entityType);

                    const relationSelection: AnyDataSelection.ToOne =
                        relationSelectionOrBoolean === true ? {} :
                            relationSelectionOrBoolean;

                    const relationSchema = relation.join("LEFT", qb, schema);

                    const relationLoader = select(
                        relationTypeInfo,
                        qb,
                        selector,
                        relationSelection,
                        relationSchema,
                    );

                    if (relationSelection.notNull) {
                        qb.andWhere(
                            relation.right.entityMetadata.primaryColumns
                                .toSeq()
                                .map(column => `${relationSchema}.${column.databaseName} IS NOT NULL`)
                                .join(" AND ")
                        )
                    }

                    // console.log(relations);
                    loaders.push(async context => {
                        context.row[propertyName] =
                            (await relationLoader.loadOneRaw(context.raw))?.row || null
                    })


                } else if (relationMetadata.isOneToMany || relationMetadata.isManyToMany) {
                    const relation = new EntityRelation(
                        qb.connection,
                        <Function>childEntityMetadata.target,
                        propertyName,
                        true
                    );


                    const relationSelection: AnyDataSelection.ToMany =
                        relationSelectionOrBoolean === true ? {} :
                            relationSelectionOrBoolean;

                    loaders.push(async context => {

                        const qb = connection.getRepository(relation.left.entityType)
                            .createQueryBuilder();

                        const selector = new QueryBuilderSelector(qb);

                        relation.join("INNER", qb, qb.alias, context.objectKey);

                        const relationTypeInfo = childTypeInfo.relations?.[propertyName] ||
                            DataTypeInfo.get(relation.left.entityType);

                        const loader = selectCursor(
                            relationTypeInfo,
                            qb,
                            selector,
                            relationSelection,
                            relationSelection
                        )
                        context.row[propertyName] = await loader.loadMany();
                    })
                }


            }


            return loaders


        }

    }


}


