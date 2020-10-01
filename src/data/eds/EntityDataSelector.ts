import { EntityMetadata } from "typeorm";
import { mapArrayToObject } from "../../common/array/mapArrayToObject";
import { defined } from "../../common/object/defined";
import { definedAt } from "../../common/object/definedAt";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { Awaitable } from "../../common/typings";
import { DataExp } from "../DataExp";
import { DataExpTranslatorToQeb } from "../../typeorm/exp/DataExpTranslatorToQeb";
import { QueryExpBuilder } from "../../typeorm/QueryExpBuilder";
import { EntityRelation } from "../../typeorm/relations";
import { DataFieldsTranslator } from "../DataFieldsTranslator";
import { DataOrder } from "../DataOrder";
import { AnyDataSelection, DataSelection } from "../DataSelection";
import { DataTypeInfo } from "../DataTypeInfo";
import { KeyObject } from "../KeyObject";
import { getEntityDataInfo } from "./getEntityDataInfo";

export namespace EntityDataSelector {
  const defaultChildKey = "";

  export function selectCursor(
    typeInfo: DataTypeInfo,
    qb: QueryExpBuilder,
    selection: AnyDataSelection,
    cursor: {
      skip?: number;
      take?: number;
      order?: DataOrder<any>[];
    },
    baseRow: object
  ): ReturnType<typeof select> {
    const loader = select(typeInfo, qb, selection, qb.alias, baseRow);

    const translator = new DataExpTranslatorToQeb(typeInfo, qb, qb.alias);

    qb.query.skip = cursor.skip;
    qb.query.take = cursor.take;

    cursor.order?.forEach((order) => {
      qb.order.push({
        by: translator.translate(order.by),
        sort: order.sort,
        nulls: order.nulls,
      });
    });
    return loader;
  }

  export function select(
    typeInfo: DataTypeInfo,
    qb: QueryExpBuilder,
    selection: AnyDataSelection,
    schema: string,
    baseRow: object
  ) {
    type RowContext = {
      row: object;
      raw: object;
      objectKey: object;
    };
    type RowLoader = (context: RowContext) => Awaitable;

    const { connection } = qb;

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
    const objectKeyLoaders = mapArrayToObject(
      entityMetadata.primaryColumns,
      (column) => [
        column.propertyName,
        qb.selectColumn(schema, column.databaseName),
      ]
    );

    const entityKeys = entityInfo.nonRelationColumnKeys;

    // console.log(typeInfo);

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
      loadMany,
    };

    async function loadMany(): Promise<any[]> {
      const rows: any[] = [];

      // console.log(qb.getQueryAndParameters());
      for (const raw of await qb.getMany()) {
        const context = await loadOneRaw(raw);
        context && rows.push(context.row);
      }
      return rows;
    }

    async function loadOneRaw(raw: object): Promise<RowContext | undefined> {
      const objectKey: object = mapObject(objectKeyLoaders, (loader) =>
        loader(raw)
      );

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

      const childEntityInfo = getEntityDataInfo(childEntityMetadata);

      // select non-relations-columns
      for (const columnPropertyName of selectedKeys) {
        const column = definedAt(
          childEntityInfo.propertyNameToColumnMetadata,
          columnPropertyName
        );
        if (column.propertyName in fields) continue;

        const loader = qb.selectColumn(schema, column.databaseName);
        loaders.push(async (context) => {
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
          new DataExpTranslatorToQeb(childTypeInfo, qb, schema).translate(
            fieldsTranslator.translate(exp)
          )
        );

        loaders.push((context) => {
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
            qb.connection,
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

          const relationLoader = select(
            relationTypeInfo,
            qb,
            relationSelection,
            relationSchema,
            baseRow
          );

          if (relationSelection.notNull) {
            qb.filter({
              $and: relation.right.entityMetadata.primaryColumns.map(
                (column) => {
                  return {
                    $isNotNull: {
                      $at: { [relationSchema]: column.databaseName },
                    },
                  };
                }
              ),
            });
          }

          // console.log(relations);
          loaders.push(async (context) => {
            context.row[propertyName] =
              (await relationLoader.loadOneRaw(context.raw))?.row || null;
          });
        } else if (
          relationMetadata.isOneToMany ||
          relationMetadata.isManyToMany
        ) {
          const relation = new EntityRelation(
            qb.connection,
            <Function>childEntityMetadata.target,
            propertyName,
            true
          );

          const relationSelection: AnyDataSelection.ToMany =
            relationSelectionOrBoolean === true
              ? {}
              : relationSelectionOrBoolean;

          loaders.push(async (context) => {
            const qb = new QueryExpBuilder(connection, {
              from: relation.left.entityMetadata.tableName,
            });

            relation.joinQeb("INNER", qb, qb.alias, context.objectKey);

            const relationTypeInfo =
              childTypeInfo.relations?.[propertyName] ||
              DataTypeInfo.get(relation.left.entityType);

            const loader = selectCursor(
              relationTypeInfo,
              qb,
              relationSelection,
              relationSelection,
              baseRow
            );
            context.row[propertyName] = await loader.loadMany();
          });
        }
      }

      return loaders;
    }
  }
}
