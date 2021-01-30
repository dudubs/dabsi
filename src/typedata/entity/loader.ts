import { Connection, EntityMetadata, QueryRunner } from "typeorm";
import { defined } from "@dabsi/common/object/defined";
import { definedAt } from "@dabsi/common/object/definedAt";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { ColumnLoader, DataQueryBuilder } from "@dabsi/typedata/query/builder";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataFieldsTranslator } from "@dabsi/typedata/fieldsTranslator";
import { DataOrder } from "@dabsi/typedata/order";
import { DataSource } from "@dabsi/typedata/source";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { KeyObject } from "@dabsi/typedata/KeyObject";
import { DataEntityCursor } from "@dabsi/typedata/entity/cursor";
import { DataEntityTranslator } from "@dabsi/typedata/entity/translator";
import { getDataEntityInfo } from "@dabsi/typedata/entity/info";
import DataQueryRunner from "@dabsi/typedata/query/runner";
import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { getEntityMetadata } from "@dabsi/typedata/entity/metadata";
type RowContext = {
  row: any;
  raw: any;
  objectKey: object;
  textKey: string;
};
type RowLoader = (context: RowContext) => Awaitable;

type Props = {
  connection: Connection;
  qureyRunner: QueryRunner;
  typeInfo: DataTypeInfo;
  qb: DataQueryBuilder;
  selection: AnyDataSelection;
  source: DataSource<any>;
};

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

    let rowLoader: (context: RowContext) => Awaitable;

    const rootBaseRow = new DataSourceRow(source);

    const entityMetadata = getEntityMetadata(connection, typeInfo.type);

    const entityInfo = getDataEntityInfo(entityMetadata);

    const discriminatorKeyMap: Record<string, string> = {};

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

    // filter by types
    const { discriminatorColumn, childEntityMetadatas } = entityMetadata;
    if (discriminatorColumn) {
      qb.filter({
        $at: {
          [schema]: {
            [discriminatorColumn.propertyName]: {
              $in: [entityMetadata]
                .toSeq()
                .concat(childEntityMetadatas)
                .map(x => x.discriminatorValue)
                .filter(x => typeof x === "string")
                .toArray(),
            },
          },
        },
      });
    }

    if (!hasKeys(typeInfo.children)) {
      const rowLoaders: RowLoader[] = getRowTypeLoaders(
        DataTypeInfo.get(typeInfo.type),
        entityMetadata,
        defaultChildKey,
        new Set(selection.pick || entityInfo.nonRelationColumnKeys),
        selection.fields || {},
        <any>selection.relations || {}
      );

      rowLoader = async context => {
        for (const rowLoader of rowLoaders) {
          await rowLoader(context);
        }
      };
    } else {
      const childKeyLoadersMap: Record<string, RowLoader[]> = {};
      const discriminatorLoader = qb.selectColumn(
        schema,
        entityMetadata.discriminatorColumn!.databaseName
      );

      for (const [childKey, rowTypeInfo] of entries<DataTypeInfo>(
        typeInfo.children
      )) {
        const childMetadata = getEntityMetadata(connection, rowTypeInfo.type);
        const childSelection = DataSelection.atChild(selection, childKey);
        const childEntityInfo = getDataEntityInfo(childMetadata);
        discriminatorKeyMap[childMetadata.discriminatorValue!] = childKey;
        childKeyLoadersMap[childKey] = getRowTypeLoaders(
          rowTypeInfo,
          childMetadata,
          childKey,
          new Set(childSelection.pick ?? childEntityInfo.nonRelationColumnKeys),
          childSelection.fields || {},
          childSelection.relations || {}
        );
      }

      rowLoader = async context => {
        const discriminatorValue = discriminatorLoader(context.raw);
        const childKey = defined(
          discriminatorKeyMap[discriminatorValue],
          () =>
            `No have childKey for discriminatorValue "${discriminatorValue}".`
        );
        context.row.$type = childKey;
        const loaders = childKeyLoadersMap[childKey];
        for (const rowLoader of loaders) {
          await rowLoader(context);
        }
      };
    }

    return {
      connection,
      loadOneRaw,
      loadRows,
      qb,
      translator: new DataEntityTranslator(
        connection,
        typeInfo,
        qb,
        qb.query.alias
      ),
    };

    async function loadRows(baseRow?: object): Promise<any[]> {
      const rows: any[] = [];

      const runner = new DataQueryRunner(qb.query, qureyRunner);

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

      const textKey = singlePrimaryColumn
        ? String(objectKey[singlePrimaryColumn.propertyName])
        : KeyObject.stringify(objectKey);

      const row: any = {};
      row.$key = textKey;

      const context: RowContext = {
        row,
        raw,
        objectKey,
        textKey,
      };

      Object.setPrototypeOf(row, baseRow);

      await rowLoader(context);

      return context;
    }

    function getRowTypeLoaders(
      rowTypeInfo: DataTypeInfo,
      rowEntityMetadata: EntityMetadata,
      childKey: string,
      columns: Set<string>,
      fields: Record<string, DataExp<any>>,
      relations: Record<string, boolean | AnyDataSelection.ToOneOrMany>
    ) {
      const loaders: RowLoader[] = [];

      const childEntityInfo = getDataEntityInfo(rowEntityMetadata);

      // select non-relations-columns
      for (const columnPropertyName of columns) {
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
        if (propertyName in childEntityInfo.propertyRelationMapMetadata) {
          throw new Error(
            `Can't override relation by field "${propertyName}".`
          );
        }

        const loader = qb.select(
          `${schema}${childKey ? `_as_${childKey}` : ""}_x_${propertyName}`,
          new DataEntityTranslator(
            connection,
            rowTypeInfo,
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
          childEntityInfo.propertyRelationMapMetadata,
          propertyName
        );

        if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {
          const relation = new DataEntityRelation(
            connection,
            <Function>rowEntityMetadata.target,
            propertyName,
            false
          );

          const relationTypeInfo =
            rowTypeInfo.relations?.[propertyName] ||
            DataTypeInfo.get(relation.right.entityType);

          const relationSelection: AnyDataSelection.ToOne =
            relationSelectionOrBoolean === true
              ? {}
              : relationSelectionOrBoolean;

          const relationSchema = relation.join("LEFT", qb, schema, null);

          const relationLoader = create({
            connection,
            qureyRunner,
            qb,
            source,
            selection: relationSelection,
            typeInfo: relationTypeInfo,
            schema: relationSchema,
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
                new DataSourceRow(
                  source.at(propertyName as never, context.textKey)
                )
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
          const relation = new DataEntityRelation(
            connection,
            <Function>rowEntityMetadata.target,
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

            relation.join("INNER", qb, qb.query.alias, context.objectKey);

            const relationTypeInfo =
              rowTypeInfo.relations?.[propertyName] ||
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
              new DataSourceRow(
                source.at(propertyName as never, context.textKey)
              )
            );
          });
        }
      }

      return loaders;
    }
  }
}
