import { defined } from "@dabsi/common/object/defined";
import { definedAt } from "@dabsi/common/object/definedAt";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { getDataEntityMetadata } from "@dabsi/typedata/entity/metadata";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
import { DataEntityTranslator } from "@dabsi/typedata/entity/translator";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataFieldsTranslator } from "@dabsi/typedata/fieldsTranslator";

import { DataOrder } from "@dabsi/typedata/order";
import { DataQueryBuilder } from "@dabsi/typedata/query/builder";
import { DataQuery } from "@dabsi/typedata/query/exp";
import { DataQueryRunner } from "@dabsi/typedata/query/runner";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { DataEntityRelation } from "@dabsi/typeorm/relations";
import { Connection, EntityMetadata } from "typeorm";
import { DataEntityKey } from "@dabsi/typedata/entity/key";

type RowLoader = (context: RowContext) => Awaitable;
const defaultChildKey = "";

export type ColumnLoader = (raw: object) => any;

type RowContext = {
  row: any;
  raw: any;
  keyObject: object;
  keyText: string;
};

export class DataEntityLoader {
  entityMetadata = getEntityMetadata(this.connection, this.typeInfo.type);

  entityInfo = getDataEntityMetadata(this.entityMetadata);

  queryBuilder = new DataQueryBuilder(this.query);

  translator = new DataEntityTranslator(
    this.connection,
    this.typeInfo,
    this.queryBuilder,
    this.query.alias
  );

  protected _keyLoaders = this.entityMetadata.primaryColumns.map(
    column =>
      <[string, ColumnLoader]>[
        column.propertyName,
        this.queryBuilder.selectColumn(this.schema, column.databaseName),
      ]
  );

  protected _baseRow = new DataSourceRow(this.source);

  private _singlePrimaryColumn =
    this.entityMetadata.primaryColumns.length === 1
      ? this.entityMetadata.primaryColumns[0]
      : undefined;

  private _selection = DataSelection.merge(
    this.typeInfo.selection,
    this.notMergedSelection
  );

  protected rowLoader = hasKeys(this.typeInfo.children)
    ? this._buildRowLoaderWithChildren()
    : this._buildRowLoaderWithoutChildren();

  constructor(
    public connection: Connection,
    public queryRunner: DataQueryRunner,
    public typeInfo: DataTypeInfo,
    public notMergedSelection: AnyDataSelection,
    public source: DataSource<any>,
    public query: DataQuery,
    public schema: string
  ) {}

  private _buildRowLoaderWithoutChildren(): RowLoader {
    const rowLoader = this._buildRowLoaderForType(
      DataTypeInfo.get(this.typeInfo.type),
      this.entityMetadata,
      defaultChildKey,
      new Set(this._selection.pick || this.entityInfo.notRelationColumnKeys),
      this._selection.fields || {},
      <any>this._selection.relations || {}
    );

    // filter root & children union
    if (this.entityMetadata.discriminatorColumn) {
      this.queryBuilder.filter({
        $at: {
          [this.schema]: {
            [this.entityMetadata.discriminatorColumn.propertyName]: {
              $in: this.entityMetadata.childEntityMetadatas
                .toSeq()
                .concat([this.entityMetadata])
                .map(m => m.discriminatorValue!)
                .toArray(),
            },
          },
        },
      });
    }

    return rowLoader;
  }

  private _buildRowLoaderWithChildren(): RowLoader {
    for (const childKey of Object.keys(this._selection.children || {})) {
      if (!(childKey in this.typeInfo.children!)) {
        throw new Error(
          `No child in ${this.typeInfo.name} like "${childKey}".`
        );
      }
    }

    const childKeyLoadersMap: Record<string, RowLoader> = {};
    const discriminatorKeyMap: Record<string, string> = {};
    const discriminatorValues: string[] = [];

    const discriminatorLoader = this.queryBuilder.selectColumn(
      this.schema,
      this.entityMetadata.discriminatorColumn!.databaseName
    );

    for (const [childKey, rowTypeInfo] of entries<DataTypeInfo>(
      this.typeInfo.children
    )) {
      const childMetadata = getEntityMetadata(
        this.connection,
        rowTypeInfo.type
      );

      const childSelection = DataSelection.atChild(this._selection, childKey);

      discriminatorValues.push(childMetadata.discriminatorValue!);
      const childEntityInfo = getDataEntityMetadata(childMetadata);

      discriminatorKeyMap[childMetadata.discriminatorValue!] = childKey;
      childKeyLoadersMap[childKey] = this._buildRowLoaderForType(
        rowTypeInfo,
        childMetadata,
        childKey,
        new Set(childSelection.pick ?? childEntityInfo.notRelationColumnKeys),
        childSelection.fields || {},
        childSelection.relations || {}
      );
    }

    this.queryBuilder.filter({
      $at: {
        [this.schema]: {
          [this.entityMetadata.discriminatorColumn!.propertyName]: {
            $in: discriminatorValues,
          },
        },
      },
    });

    return async context => {
      const discriminatorValue = discriminatorLoader(context.raw);
      const childKey = defined(
        discriminatorKeyMap[discriminatorValue],
        () => `No have childKey for discriminatorValue "${discriminatorValue}".`
      );
      context.row.$type = childKey;
      const rowLoaders = childKeyLoadersMap[childKey];
      await childKeyLoadersMap[childKey](context);
    };
  }

  protected _buildRowLoaderForType(
    rowTypeInfo: DataTypeInfo,
    rowEntityMetadata: EntityMetadata,
    childKey: string,
    columns: Set<string>,
    selectionFieldMap: Record<string, DataExp<any>>,
    selectionRelationMap: Record<string, boolean | AnyDataSelection.ToOneOrMany>
  ): RowLoader {
    const loaders: RowLoader[] = [];

    const childEntityInfo = getDataEntityMetadata(rowEntityMetadata);

    // select non-relations-columns
    for (const columnPropertyName of columns) {
      if (columnPropertyName in selectionFieldMap) {
        // override by selection.fields
        continue;
      }
      const column = definedAt(
        childEntityInfo.propertyColumnMetadataMap,
        columnPropertyName
      );

      const loader = this.queryBuilder.selectColumn(
        this.schema,
        column.databaseName
      );

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

    const fieldsTranslator = new DataFieldsTranslator(selectionFieldMap);

    for (const [propertyName, exp] of entries(selectionFieldMap)) {
      if (propertyName in childEntityInfo.propertyRelationMetadataMap) {
        throw new Error(`Can't override relation by field "${propertyName}".`);
      }

      const loader = this.queryBuilder.select(
        `${this.schema}${childKey ? `_as_${childKey}` : ""}_x_${propertyName}`,
        new DataEntityTranslator(
          this.connection,
          rowTypeInfo,
          this.queryBuilder,
          this.schema
        ).translate(fieldsTranslator.translate(exp))
      );

      loaders.push(context => {
        context.row[propertyName] = loader(context.raw);
      });
    }

    // select relations
    for (const [propertyName, relationSelectionOrBoolean] of entries<
      boolean | AnyDataSelection.ToOneOrMany
    >(selectionRelationMap)) {
      if (!relationSelectionOrBoolean) continue;

      const relationMetadata = definedAt(
        childEntityInfo.propertyRelationMetadataMap,
        propertyName
      );

      const relationSelection: any =
        relationSelectionOrBoolean === true //
          ? {}
          : relationSelectionOrBoolean;

      loaders.push(
        relationMetadata.isOneToOne || relationMetadata.isManyToOne
          ? this._buildRelationToOneLoader(
              rowTypeInfo,
              rowEntityMetadata,
              propertyName,
              relationSelection
            )
          : this._buildReationToManyLoader(
              rowTypeInfo,
              rowEntityMetadata,
              propertyName,
              relationSelection
            )
      );
    }

    return context =>
      Promise.all(
        loaders.map(loader =>
          //
          loader(context)
        )
      );
  }

  private _buildRelationToOneLoader(
    rowTypeInfo: DataTypeInfo,
    rowEntityMetadata: EntityMetadata,
    propertyName: string,
    relationSelection: AnyDataSelection.ToOne
  ): RowLoader {
    const relation = new DataEntityRelation(
      this.connection,
      <Function>rowEntityMetadata.target,
      propertyName,
      false
    );

    const relationTypeInfo =
      rowTypeInfo.relations?.[propertyName] ||
      DataTypeInfo.get(relation.right.entityType);

    const relationSchema = relation.join(
      "LEFT",
      this.queryBuilder,
      this.schema,
      null
    );

    const relationLoader = new DataEntityLoader(
      this.connection,
      this.queryRunner,
      relationTypeInfo,
      relationSelection,
      this.source,
      this.query,
      relationSchema
    );

    if (relationSelection.notNull) {
      this.queryBuilder.filter({
        $and: relation.right.entityMetadata.primaryColumns.map(column => {
          return {
            $isNotNull: {
              $at: { [relationSchema]: column.databaseName },
            },
          };
        }),
      });
    }

    return async context => {
      const relationRow = (
        await relationLoader.loadOneRow(
          context.raw,
          new DataSourceRow(
            this.source.at(propertyName as never, context.keyText)
          )
        )
      )?.row;
      if (relationRow) {
        context.row[propertyName] = relationRow;
      }
    };
  }

  private _buildReationToManyLoader(
    rowTypeInfo: DataTypeInfo,
    rowEntityMetadata: EntityMetadata,
    propertyName: string,
    relationSelection: AnyDataSelection.ToMany
  ): RowLoader {
    const relation = new DataEntityRelation(
      this.connection,
      <Function>rowEntityMetadata.target,
      propertyName,
      true
    );
    const relationTypeInfo =
      rowTypeInfo.relations?.[propertyName] ||
      DataTypeInfo.get(relation.left.entityType);

    return async context => {
      const relationQuery: DataQuery = {
        from: relation.left.entityMetadata.tableName,
        alias: "r_" + relation.propertyName,
      };
      const relationQueryBuilder = new DataQueryBuilder(relationQuery);

      relation.join(
        "INNER",
        relationQueryBuilder,
        relationQuery.alias,
        context.keyObject
      );

      const relationLoader = new DataEntityLoader(
        this.connection,
        this.queryRunner,
        relationTypeInfo,
        relationSelection,
        this.source.at(propertyName as never, context.keyText),
        relationQuery,
        relationQuery.alias
      ).loadCursor(relationSelection);

      context.row[propertyName] = await relationLoader.loadManyRows();
    };
  }

  async loadOneRow(
    raw: object,
    baseRow: object = this._baseRow
  ): Promise<RowContext | undefined> {
    const keyObject: object = {};

    for (const [propertyName, loader] of this._keyLoaders) {
      const value = loader(raw);
      if (value == null) return undefined;
      keyObject[propertyName] = value;
    }

    const keyText = this._singlePrimaryColumn
      ? String(keyObject[this._singlePrimaryColumn.propertyName])
      : DataEntityKey.stringify(this.entityMetadata, keyObject);

    const row: any = {};
    row.$key = keyText;

    const context: RowContext = {
      row,
      raw,
      keyObject,
      keyText,
    };
    Object.setPrototypeOf(row, baseRow);
    await this.rowLoader(context);
    return context;
  }

  async loadManyRows(baseRow?: object): Promise<any[]> {
    const rows: any[] = [];

    for (const raw of await this.queryRunner.getRows(this.query)) {
      const context = await this.loadOneRow(raw, baseRow);
      context && rows.push(context.row);
    }
    return rows;
  }

  loadCursor(cursor: {
    skip?: number;
    take?: number;
    order?: DataOrder<any>[];
  }): this {
    this.query.skip = cursor.skip;
    this.query.take = cursor.take;

    cursor.order?.forEach(order => {
      this.queryBuilder.order.push({
        by: this.translator.translate(order.by),
        sort: order.sort,
        nulls: order.nulls,
      });
    });
    return this;
  }
}
