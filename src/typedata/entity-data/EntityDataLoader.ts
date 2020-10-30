import { Connection, EntityMetadata } from "typeorm";
import { defined } from "../../common/object/defined";
import { definedAt } from "../../common/object/definedAt";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { Awaitable } from "../../common/typings";
import { inspect } from "../../logging";
import { EntityDataCursor } from "./EntityDataCursor";
import { EntityDataQueryRunner } from "./EntityDataQueryRunner";
import { EntityDataExpToQebTranslator } from "./EntityDataExpToQebTranslator";
import { ColumnLoader, DataQueryBuilder } from "../data-query/DataQueryBuilder";
import { EntityRelation } from "../../typeorm/relations";
import { DataExp } from "../data-exp/DataExp";
import { DataFieldsTranslator } from "../DataFieldsTranslator";
import { DataOrder } from "../DataOrder";
import {
  AnyDataSelection,
  DataSelection,
} from "../data-selection/DataSelection";
import { DataTypeInfo } from "../DataTypeInfo";
import { KeyObject } from "../KeyObject";
import { getEntityDataInfo } from "./EntityDataInfo";

export type EntityDataLoader = ReturnType<typeof EntityDataLoader.create>;
export namespace EntityDataLoader {
  const defaultChildKey = "";

  export function buildCursor(
    { qb, translator }: EntityDataLoader,
    cursor: {
      skip?: number;
      take?: number;
      order?: DataOrder<any>[];
    }
  ) {
    qb.query.skip = cursor.skip;
    qb.query.take = cursor.take;

    cursor.order?.forEach(order => {
      qb.order.push({
        by: translator.translate(order.by),
        sort: order.sort,
        nulls: order.nulls,
      });
    });
  }

  export function createFromCursor(
    entityCursor: EntityDataCursor,
    baseRow: any = {}
  ) {
    return createRoot({
      connection: entityCursor.connection,
      typeInfo: entityCursor.typeInfo,
      qb: EntityDataCursor.createQueryBuilder(entityCursor),
      selection: entityCursor.cursor.selection,
      baseRow,
    });
  }

  export function createRoot(options: {
    connection: Connection;
    typeInfo: DataTypeInfo;
    qb: DataQueryBuilder;
    selection: AnyDataSelection;
    baseRow: object;
  }): EntityDataLoader {
    return create({ ...options, schema: options.qb.query.alias });
  }

  export function create({
    connection,
    typeInfo,
    qb,
    selection,
    schema,
    baseRow,
  }: {
    connection: Connection;
    typeInfo: DataTypeInfo;
    qb: DataQueryBuilder;
    selection: AnyDataSelection;
    //
    schema: string;
    baseRow: object;
  }) {
    selection = DataSelection.merge(typeInfo.selection, selection);

    type RowContext = {
      row: object;
      raw: object;
      objectKey: object;
    };
    type RowLoader = (context: RowContext) => Awaitable;

    const entityMetadata = connection.getMetadata(typeInfo.type);
    const entityInfo = getEntityDataInfo(entityMetadata);

    const discriminatorValueLoader = entityMetadata.discriminatorColumn
      ? qb.selectColumn(schema, entityMetadata.discriminatorColumn.databaseName)
      : undefined;

    const discriminatorValueToChildKey: Record<string, string> = {};

    const singlePrimaryColumn =
      entityMetadata.primaryColumns.length === 1
        ? entityMetadata.primaryColumns[0]
        : undefined;
    const objectKeyLoaders = entityMetadata.primaryColumns.map(
      column =>
        <[string, ColumnLoader]>[
          column.propertyName,
          qb.selectColumn(schema, column.databaseName),
        ]
    );

    const entityKeys = entityInfo.nonRelationColumnKeys;

    const baseLoaders = hasKeys(typeInfo.children)
      ? undefined
      : selectChild(
          DataTypeInfo.get(typeInfo.type),
          entityMetadata,
          defaultChildKey,
          new Set(selection.pick || entityKeys),
          selection.fields || {},
          <any>selection.relations || {}
        );

    const childKeyToLoaders: Record<
      string,
      ReturnType<typeof selectChild>
    > = {};

    for (const [childKey, childTypeInfo] of entries<DataTypeInfo>(
      typeInfo.children
    )) {
      const childMetadata = connection.getMetadata(childTypeInfo.type);
      const childSelection = DataSelection.atChild(selection, childKey);
      const childEntityInfo = getEntityDataInfo(childMetadata);

      discriminatorValueToChildKey[
        childMetadata.discriminatorValue!
      ] = childKey;

      childKeyToLoaders[childKey] = selectChild(
        childTypeInfo,
        childMetadata,
        childKey,
        new Set(childSelection.pick ?? childEntityInfo.nonRelationColumnKeys),
        childSelection.fields || {},
        childSelection.relations || {}
      );
    }

    return {
      loadOneRaw,
      loadRows,
      qb,
      translator: new EntityDataExpToQebTranslator(
        connection,
        typeInfo,
        qb,
        qb.query.alias
      ),
    };

    async function loadRows(): Promise<any[]> {
      const rows: any[] = [];

      const runner = new EntityDataQueryRunner(connection, qb.query);

      for (const raw of await runner.getRows()) {
        const context = await loadOneRaw(raw);
        context && rows.push(context.row);
      }
      return rows;
    }

    async function loadOneRaw(raw: object): Promise<RowContext | undefined> {
      const objectKey: object = {};

      for (const [propertyName, loader] of objectKeyLoaders) {
        const value = loader(raw);
        if (value == null) return undefined;
        objectKey[propertyName] = value;
      }

      const row: any = Object.create(baseRow);

      row.$key = singlePrimaryColumn
        ? String(objectKey[singlePrimaryColumn.propertyName])
        : KeyObject.stringify(objectKey);

      const context = {
        row,
        raw,
        objectKey,
      };

      if (baseLoaders) {
        for (const rowLoader of baseLoaders) {
          await rowLoader(context);
        }
      } else {
        const discriminatorValue = discriminatorValueLoader?.(raw);

        const childKey = defined(
          discriminatorValueToChildKey[discriminatorValue],
          () =>
            `No have childKey for discriminatorValue "${discriminatorValue}".`
        );

        row.$type = childKey;
        const loaders = defined(
          childKeyToLoaders[childKey] ??
            //
            baseLoaders,
          () => `No have loaders for childKey "${childKey}".`
        );

        for (const rowLoader of loaders) {
          await rowLoader(context);
        }
      }

      return context;
    }

    function selectChild(
      childTypeInfo: DataTypeInfo,
      childEntityMetadata: EntityMetadata,
      childKey: string,
      selectedKeys: Set<string>,
      fields: Record<string, DataExp<any>>,
      relations: Record<string, boolean | AnyDataSelection.ToOneOrMany>
    ) {
      const loaders: RowLoader[] = [];
      // console.log(inspect({ selectChild: { childKey } }));

      const childEntityInfo = getEntityDataInfo(childEntityMetadata);

      // select non-relations-columns
      for (const columnPropertyName of selectedKeys) {
        if (columnPropertyName in fields) continue;
        const column = definedAt(
          childEntityInfo.propertyNameToColumnMetadata,
          columnPropertyName
        );

        const loader = qb.selectColumn(schema, column.databaseName);
        loaders.push(async context => {
          let value = await loader(context.raw);

          if (Array.isArray(column.transformer)) {
            for (let valueTransformer of column.transformer) {
              value = valueTransformer.from(value);
            }
          } else if (column.transformer) {
            value = column.transformer.from(value);
          }
          context.row[columnPropertyName] = value;
        });
      }

      // select fields

      const fieldsTranslator = new DataFieldsTranslator(fields);

      for (const [propertyName, exp] of entries(fields)) {
        if (propertyName in childEntityInfo.propertyNameToRelationMetadata) {
          throw new Error(
            `Can't override relation by field "${propertyName}".`
          );
        }

        const loader = qb.select(
          `${schema}${childKey ? `_as_${childKey}` : ""}_x_${propertyName}`,
          new EntityDataExpToQebTranslator(
            connection,
            childTypeInfo,
            qb,
            schema
          ).translate(fieldsTranslator.translate(exp))
        );

        loaders.push(context => {
          context.row[propertyName] = loader(context.raw);
        });
      }

      // select relations
      for (let [propertyName, relationSelectionOrBoolean] of entries<
        boolean | AnyDataSelection.ToOneOrMany
      >(relations)) {
        if (!relationSelectionOrBoolean) continue;

        const relationMetadata = definedAt(
          childEntityInfo.propertyNameToRelationMetadata,
          propertyName
        );

        if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {
          const relation = new EntityRelation(
            connection,
            <Function>childEntityMetadata.target,
            propertyName,
            false
          );

          const relationTypeInfo =
            childTypeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType);

          const relationSelection: AnyDataSelection.ToOne =
            relationSelectionOrBoolean === true
              ? {}
              : relationSelectionOrBoolean;

          const relationSchema = relation.joinQeb("LEFT", qb, schema, null);

          const relationLoader = create({
            connection,
            typeInfo: relationTypeInfo,
            qb,
            selection: relationSelection,
            schema: relationSchema,
            baseRow,
          });

          if (relationSelection.notNull) {
            qb.filter({
              $and: relation.right.entityMetadata.primaryColumns.map(column => {
                return {
                  $isNotNull: {
                    $at: { [relationSchema]: column.databaseName },
                  },
                };
              }),
            });
          }

          loaders.push(async context => {
            context.row[propertyName] =
              (await relationLoader.loadOneRaw(context.raw))?.row || null;
          });
        } else if (
          relationMetadata.isOneToMany ||
          relationMetadata.isManyToMany
        ) {
          const relation = new EntityRelation(
            connection,
            <Function>childEntityMetadata.target,
            propertyName,
            true
          );

          const relationSelection: AnyDataSelection.ToMany =
            relationSelectionOrBoolean === true
              ? {}
              : relationSelectionOrBoolean;

          loaders.push(async context => {
            const qb = DataQueryBuilder.createRoot(
              relation.left.entityMetadata.tableName
            );

            relation.joinQeb("INNER", qb, qb.query.alias, context.objectKey);

            const relationTypeInfo =
              childTypeInfo.relations?.[propertyName] ||
              DataTypeInfo.get(relation.left.entityType);

            const loader = createRoot({
              connection,
              typeInfo: relationTypeInfo,
              qb,
              selection: relationSelection,
              baseRow,
            });

            buildCursor(loader, relationSelection);

            context.row[propertyName] = await loader.loadRows();
          });
        }
      }

      return loaders;
    }
  }
}
