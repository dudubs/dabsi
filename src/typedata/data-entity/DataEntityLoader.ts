import { Connection, EntityMetadata, QueryRunner } from "typeorm";
import { defined } from "@dabsi/common/object/defined";
import { definedAt } from "@dabsi/common/object/definedAt";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { EntityRelation } from "@dabsi/typeorm/relations";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import {
  ColumnLoader,
  DataQueryBuilder,
} from "@dabsi/typedata/data-query/DataQueryBuilder";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataFieldsTranslator } from "@dabsi/typedata/DataFieldsTranslator";
import { DataOrder } from "@dabsi/typedata/DataOrder";
import { DataSource } from "@dabsi/typedata/DataSource";
import { DataSourceRow } from "@dabsi/typedata/DataSourceRow";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import { KeyObject } from "@dabsi/typedata/KeyObject";
import { DataEntityCursor } from "@dabsi/typedata/data-entity/DataEntityCursor";
import { DataEntityExpTranslatorToDataQueryExp } from "@dabsi/typedata/data-entity/DataEntityExpTranslatorToDataQueryExp";
import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import DataEntityQueryRunner from "@dabsi/typedata/data-entity/DataEntityQueryRunner";

export type DataEntityLoader = ReturnType<typeof DataEntityLoader.create>;
export namespace DataEntityLoader {
  const defaultChildKey = "";

  export function buildCursor(
    { qb, translator }: DataEntityLoader,
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
    entityCursor: DataEntityCursor,
    source: DataSource<any>,
    { qb = DataEntityCursor.createQueryBuilder(entityCursor) } = {}
  ) {
    return createRoot({
      qureyRunner: entityCursor.queryRunner,
      connection: entityCursor.connection,
      typeInfo: entityCursor.typeInfo,
      qb,
      selection: entityCursor.cursor.selection,
      source,
    });
  }

  type Props = {
    connection: Connection;
    qureyRunner: QueryRunner;
    typeInfo: DataTypeInfo;
    qb: DataQueryBuilder;
    selection: AnyDataSelection;
    source: DataSource<any>;
  };

  export function createRoot(props: Props): DataEntityLoader {
    return create({ ...props, schema: props.qb.query.alias });
  }

  export function create({
    connection,
    qureyRunner,
    typeInfo,
    qb,
    selection,
    schema,
    source,
  }: Props & {
    //
    schema: string;
  }) {
    selection = DataSelection.merge(typeInfo.selection, selection);
    const rootBaseRow = new DataSourceRow(source);

    type RowContext = {
      row: object;
      raw: object;
      objectKey: object;
      key: string;
    };
    type RowLoader = (context: RowContext) => Awaitable;

    const entityMetadata = connection.getMetadata(typeInfo.type);
    const entityInfo = getDataEntityInfo(entityMetadata);

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
      const childEntityInfo = getDataEntityInfo(childMetadata);

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
      connection,
      loadOneRaw,
      loadRows,
      qb,
      translator: new DataEntityExpTranslatorToDataQueryExp(
        connection,
        typeInfo,
        qb,
        qb.query.alias
      ),
    };

    async function loadRows(baseRow?: object): Promise<any[]> {
      const rows: any[] = [];

      const runner = new DataEntityQueryRunner(qb.query, qureyRunner);

      for (const raw of await runner.getRows()) {
        const context = await loadOneRaw(raw, baseRow);
        context && rows.push(context.row);
      }
      return rows;
    }

    async function loadOneRaw(
      raw: object,
      baseRow: object = rootBaseRow
    ): Promise<RowContext | undefined> {
      const objectKey: object = {};

      for (const [propertyName, loader] of objectKeyLoaders) {
        const value = loader(raw);
        if (value == null) return undefined;
        objectKey[propertyName] = value;
      }

      const key = singlePrimaryColumn
        ? String(objectKey[singlePrimaryColumn.propertyName])
        : KeyObject.stringify(objectKey);

      const row: any = {};
      row.$key = key;
      const context = {
        row,
        raw,
        objectKey,
        key,
      };

      Object.setPrototypeOf(row, baseRow);
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
      selectedColumns: Set<string>,
      fields: Record<string, DataExp<any>>,
      relations: Record<string, boolean | AnyDataSelection.ToOneOrMany>
    ) {
      const loaders: RowLoader[] = [];

      const childEntityInfo = getDataEntityInfo(childEntityMetadata);

      // select non-relations-columns
      for (const columnPropertyName of selectedColumns) {
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
          new DataEntityExpTranslatorToDataQueryExp(
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
            qureyRunner,
            typeInfo: relationTypeInfo,
            qb,
            selection: relationSelection,
            schema: relationSchema,
            source,
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
            const relationRow = (
              await relationLoader.loadOneRaw(
                context.raw,
                new DataSourceRow(source.at(propertyName as never, context.key))
              )
            )?.row;
            if (relationRow) {
              context.row[propertyName] = relationRow;
            }
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
              qureyRunner,
              connection,
              typeInfo: relationTypeInfo,
              qb,
              selection: relationSelection,
              source,
            });

            buildCursor(loader, relationSelection);

            context.row[propertyName] = await loader.loadRows(
              new DataSourceRow(source.at(propertyName as never, context.key))
            );
          });
        }
      }

      return loaders;
    }
  }
}
