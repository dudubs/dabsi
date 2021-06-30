import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
// TODO: DataSource.clone(), DataSource.freeze()
import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { BaseType, RebaseType } from "@dabsi/typedata/BaseType";
import { chunks } from "@dabsi/typedata/chunks";
import { DataCursor, EMPTY_DATA_CURSOR } from "@dabsi/typedata/cursor";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataFields, DataFieldsRow } from "@dabsi/typedata/fields";
import { DataKey, DataKeyOrKeys } from "@dabsi/typedata/key";
import { DataNullsSort, DataOrder, DataSort } from "@dabsi/typedata/order";
import {
  DataRelationKeys,
  DataRelationTreeKeys,
  DataRelationType,
} from "@dabsi/typedata/relation";
import { DataRow, DataTreeRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import { WithDataUnionMetaChildren } from "@dabsi/typedata/union";
import { DataInsertRow, DataUpdateRow } from "@dabsi/typedata/value";

export type SelectedDataSource<T, S> = DataSource<DataSelectionRow<T, S>>;

declare global {
  namespace TypeData {
    interface IDataSource<T> {}
  }
}
export declare namespace DataSource {
  export type At<T, K extends DataRelationKeys<T>> = DataSource<
    DataRelationType<Required<T>[K]>
  >;

  export type Based<T> = DataSource<BaseType<T>>;
}

export interface DataSource<T> extends TypeData.IDataSource<T> {}

export abstract class DataSource<T> {
  // $debugType!: T;

  abstract getRows(): Promise<DataRow<T>[]>;

  // count()
  abstract getCountRows(): Promise<number>;

  // hasRows()
  abstract hasRows(): Promise<boolean>;

  abstract cursor: DataCursor;

  abstract withCursor(cursor: DataCursor): DataSource<any>;

  protected abstract handleDelete(keys: string[]): Promise<void>;

  protected abstract handleGetTree<T>(
    this: DataSource<T>,
    inverse: boolean,
    relationPropertyName: string
  ): Promise<DataTreeRow<T>[]>;

  protected abstract handleUpdate<T>(
    this: DataSource<T>,
    keys: string[],
    value: DataUpdateRow<T>
  ): Promise<number>;

  protected abstract handleUpdateRelations(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void>;

  // countAndFetch
  async getCountAndRows<T>(
    this: DataSource<T>
  ): Promise<[number, DataRow<T>[]]> {
    // TODO: Optimizing
    return [await this.getCountRows(), await this.getRows()];
  }

  // fetchMap
  async getRowMap(): Promise<Record<string, DataRow<T>>> {
    return mapArrayToObject(await this.getRows(), row => [row.$key, row]);
  }

  getKeys(): Promise<string[]> {
    return this._selectKeys()
      .getRows()
      .then(rows => rows.map(row => row.$key));
  }

  rebase<T>(this: DataSource<T>): DataSource<RebaseType<T>> {
    return <any>this.withCursor({
      ...this.cursor,
      selection: {},
    });
  }

  protected _selectKeys<T>(this: DataSource<T>): DataSource<T> {
    return this.updateCursor({
      selection: {
        pick: [],
        fields: {},
        children: {},
        relations: {},
      },
    });
  }

  async *find(pageSize = 10): AsyncIterableIterator<DataRow<T>> {
    let source: DataSource<T> = this.updateCursor({
      skip: 0,
      take: pageSize,
    });

    while (true) {
      const rows = await source.getRows();
      yield* rows;
      if (pageSize > rows.length) break;
      source = source.updateCursor({
        skip: source.cursor.skip + rows.length,
      });
    }
  }

  //
  async touch<T>(
    this: DataSource<T>,
    // TODO: Exclude keys .of(key, value)
    insert?: DataInsertRow<T>
  ): Promise<DataRow<T>> {
    return (await this.get()) || (await this.insert(insert || ({} as any)));
  }

  // fetchOrFail
  async getOrFail(key?: string | number): Promise<DataRow<T>> {
    return defined(await this.get(key?.toString()), () =>
      key ? `No row "${key}"` : "No row"
    );
  }

  async get(key?: string | number): Promise<DataRow<T> | undefined> {
    if (typeof key === "number") key = String(key);
    const result = await this.filter(
      typeof key === "string" ? { $is: key } : undefined
    )
      .take(1)
      .getRows();

    return (
      result[0] && Object.setPrototypeOf(result[0], new DataSourceRow(this))
    );
  }

  // relation

  async updateRelations(keyMap: Record<string, boolean>): Promise<void> {
    const keysToAdd: string[] = [];
    const keysToRemove: string[] = [];

    for (const [key, toAdd] of entries(keyMap)) {
      if (toAdd) {
        // !existsKeys.has(key) &&
        keysToAdd.push(key);
      } else {
        // existsKeys.has(key) &&
        keysToRemove.push(key);
      }
    }
    await this.handleUpdateRelations(keysToAdd, keysToRemove);
  }

  // TODO: insertManyKeys, insertKey
  insertKey(value: DataInsertRow<T>): Promise<string>;
  insertKey(values: DataInsertRow<T>[]): Promise<string[]>;
  insertKey(values) {
    return Array.isArray(values)
      ? this.insertKeys(values)
      : this.insertKeys([values]).then(rows => rows[0]);
  }

  // TODO: doInsertManyKeys
  protected abstract insertKeys<T>(
    datas: DataInsertRow<T>[]
  ): Promise<string[]>;

  protected async _each(
    keyOrKeys: DataKeyOrKeys<T> | undefined,
    callback: (keys: string[]) => Promise<void>
  ): Promise<string[]> {
    let keys: string[];

    if (!keyOrKeys && this.cursor.keys.length) {
      keyOrKeys = this.cursor.keys;
    }

    if (keyOrKeys !== undefined) {
      if (Array.isArray(keyOrKeys)) {
        keys = keyOrKeys.map(DataKey);
      } else {
        keys = [DataKey(keyOrKeys)];
      }
      await callback(keys);
      return keys;
    } else {
      keys = [];
      for await (const rows of chunks(this._selectKeys().find(), 100)) {
        const chunkKeys = rows.map(row => row.$key);
        keys.push(...chunkKeys);
        await callback(chunkKeys);
      }
    }
    return keys;
  }

  async update(value: DataUpdateRow<T>): Promise<string[]>;
  async update(
    keyOrKeys: DataKeyOrKeys<T>,
    value: DataUpdateRow<T>
  ): Promise<string[]>;
  async update(...args): Promise<string[]> {
    let values;
    let keyOrKeys = undefined;
    if (args.length === 1) {
      [values] = args;
    } else {
      [keyOrKeys, values] = args;
    }
    return this._each(keyOrKeys, async keys => {
      await this.handleUpdate(keys, values);
    });
  }

  async add(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._each(keyOrKeys, keys => this.handleUpdateRelations(keys, []));
  }

  async remove(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._each(keyOrKeys, keys => this.handleUpdateRelations([], keys));
  }

  async delete(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._each(keyOrKeys, keys => this.handleDelete(keys));
  }

  insert<T>(this: DataSource<T>, value: DataInsertRow<T>): Promise<DataRow<T>>;
  insert<T>(
    this: DataSource<T>,
    values: DataInsertRow<T>[]
  ): Promise<DataRow<T>[]>;

  async insert(values): Promise<any> {
    if (!Array.isArray(values)) {
      return this.insert([values]).then(rows => rows[0]);
    }
    const keys = await this.insertKeys(values);

    const baseRow = new DataSourceRow(this);

    return this.filter({ $is: keys })
      .getRows()
      .then(rows => rows.map(row => Object.setPrototypeOf(row, baseRow)));
  }

  // cursoring

  // asMutable()
  // asImmutable()

  updateCursor<U = any>(callbackOrCursor: Partial<DataCursor>): DataSource<U> {
    return <any>this.withCursor({ ...this.cursor, ...callbackOrCursor });
  }

  as<K extends keyof Children, Children>(
    this: DataSource<WithDataUnionMetaChildren<Children>>,
    type: string & K
  ): DataSource<Children[K]> {
    return this.updateCursor({
      type,
    });
  }

  T?: T;

  protected _buildCursor<
    K extends ExtractKeys<
      typeof DataCursor,
      (cursor: DataCursor<any>, ...args: any[]) => DataCursor<any>
    >
  >(
    method: K,
    ...args: typeof DataCursor[K] extends (_: any, ...args: infer U) => any
      ? U
      : []
  ): DataSource<any> {
    return <any>(
      this.withCursor((DataCursor as any)[method](this.cursor, ...args))
    );
  }

  of<T>(this: DataSource<T>, keyMap: Record<string, any>): DataSource<T>;
  of<T>(this: DataSource<T>, keyOrKeys: string | string[]): DataSource<T>;

  of<T, K extends string & keyof Required<T>>(
    this: DataSource<T>,
    propertyName: string & K,
    value: DataKey<T[K]>
  ): DataSource<T>;
  of(...args) {
    if (args.length === 2) {
      const [k, v] = args;
      return this._buildCursor("ofKeyMap", { [k]: v });
    }
    const [arg0] = args;

    if (typeof arg0 === "string") {
      return this._buildCursor("ofKeys", [arg0]);
    }
    if (Array.isArray(arg0)) {
      return this._buildCursor("ofKeys", arg0);
    }

    return this._buildCursor("ofKeyMap", arg0);
  }

  at<T, K extends DataRelationKeys<T>>(
    this: DataSource<T>,
    propertyName: K,
    key: DataKey<DataRelationType<T[K]>> = this.cursor.keys[0]
  ): DataSource.At<T, K> {
    if (!key) {
      throw new Error("No data-key for location.");
    }
    return <any>(
      this.withCursor(DataCursor.at(this.cursor, propertyName, DataKey(key)))
    );
  }

  skip(count: number): DataSource<T> {
    return this.updateCursor({ skip: count });
  }

  take(count: number, skip: number = this.cursor.skip): DataSource<T> {
    return this.updateCursor({ take: count, skip });
  }

  addSort(order: DataOrder<T>[]): DataSource<T>;
  addSort(by: DataExp<T>, sort: DataSort, nulls?: DataNullsSort): DataSource<T>;
  addSort(...args) {
    return this._sort(true, args);
  }

  sort(orders: DataOrder<T>[]): DataSource<T>;
  sort(by: DataExp<T>, sort: DataSort, nulls?: DataNullsSort): DataSource<T>;
  sort(...args) {
    return this._sort(false, args);
  }

  private _sort(add: boolean, args: any[]) {
    if (args.length > 1) {
      const [by, sort, nulls] = args;
      args = [{ by, sort, nulls }];
    }

    const [order] = args;

    if (add && !order.length) {
      return this;
    }

    return this.updateCursor({
      order: add ? [this.cursor.order, ...order] : order,
    });
  }

  addFields<T, Fields extends DataFields<T>>(
    this: DataSource<T>,
    fields: Fields
  ): DataSource<T & DataFieldsRow<T, Fields>> {
    return this.updateCursor({
      selection: DataSelection.merge(this.cursor.selection, { fields }),
    });
  }

  filter<T>(this: DataSource<T>, ...exps: DataExp<T>[]): DataSource<T> {
    const filter = DataExp({ $and: exps as any });
    if (filter === undefined) return this;
    return this.updateCursor({
      filter: DataExp(this.cursor.filter, filter),
    });
  }

  rootAt<T, K extends DataRelationKeys<T>>(
    this: DataSource<T>,
    key: K
  ): DataSource<DataRelationType<T[K]>> {
    return <any>this.withCursor({
      ...this.cursor,
      ...EMPTY_DATA_CURSOR,
      root: [
        ...this.cursor.root,
        ...this.cursor.location.map(p => p.propertyName),
        key,
      ],
    });
  }

  getTreeOf<T>(
    this: DataSource<T>,
    relationPropertyName: string & DataRelationTreeKeys<RebaseType<T>>
  ): Promise<DataTreeRow<T>[]> {
    return this.handleGetTree(false, relationPropertyName);
  }

  async getTreeAt<T>(
    this: DataSource<T>,
    relationPropertyName: string & DataRelationTreeKeys<RebaseType<T>>,
    childToParent = false
  ): Promise<DataRow<T>[][]> {
    const children = await this.handleGetTree(true, relationPropertyName);

    return [
      //
      ...flat(children, []),
    ];

    function* flat(
      children: DataTreeRow<T>[],
      parents: DataTreeRow<T>[]
    ): IterableIterator<DataTreeRow<T>[]> {
      if (!children.length) {
        yield parents;
        return;
      }
      for (const child of children) {
        yield* flat(
          child.$children,
          childToParent ? [child, ...parents] : [...parents, child]
        );
      }
    }
  }
}
