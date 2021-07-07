import { entries } from "@dabsi/common/object/entries";
import { BaseType, RebaseType } from "@dabsi/typedata/BaseType";
import { chunks } from "@dabsi/typedata/chunks";
import { DataCursor, EMPTY_DATA_CURSOR } from "@dabsi/typedata/cursor";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataFields, DataFieldsRow } from "@dabsi/typedata/fields";
import { DataKey, DataKeyOrKeys } from "@dabsi/typedata/key";
import { DataNullsSort, DataOrder, DataSort } from "@dabsi/typedata/order";
import { DataRelationKeys, DataRelationType } from "@dabsi/typedata/relation";
import { DataRow, DataTreeRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { WithDataUnionMetaChildren } from "@dabsi/typedata/union";
import { DataUpdateRow } from "@dabsi/typedata/value";

export type DataSelectedSource<T, S> = DataSource<DataSelectionRow<T, S>>;

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

  protected abstract handleFetch(source: DataSource<any>): Promise<any[]>;

  // count()
  abstract count(): Promise<number>;

  abstract has(): Promise<boolean>;

  abstract cursor: DataCursor;

  abstract withCursor(cursor: DataCursor): DataSource<any>;

  protected abstract handleInsert(rows: any[]): Promise<string[]>;

  protected abstract handleDelete(keys: string[]): Promise<void>;

  protected abstract handleFetchTree(
    source: DataSource<any>,
    inverse: boolean,
    relationPropertyName: string
  ): Promise<DataTreeRow<{}>[]>;

  protected abstract handleUpdate(
    keys: string[],
    value: DataUpdateRow<any>
  ): Promise<number>;

  protected abstract handleUpdateRelations(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void>;

  async countAndFetch<T>(this: DataSource<T>): Promise<[number, DataRow<T>[]]> {
    return [await this.count(), await this.handleFetch(this)];
  }

  rebase<T>(this: DataSource<T>): DataSource<RebaseType<T>> {
    return <any>this.withCursor({ ...this.cursor, selection: {} });
  }

  protected _selectKeys(): DataSource<{}> {
    return this.withCursor({
      ...this.cursor,
      selection: {
        pick: [],
        fields: {},
        children: {},
        relations: {},
      },
    });
  }

  async *find<T>(
    this: DataSource<T>,
    pageSize = 10
  ): AsyncIterableIterator<DataRow<T>> {
    let source: DataSource<T> = this.withCursor({
      ...this.cursor,
      skip: 0,
      take: pageSize,
    });

    while (true) {
      const rows = await source.fetchAll();
      yield* rows;
      if (pageSize > rows.length) break;
      source = source.withCursor({
        ...this.cursor,
        skip: source.cursor.skip + rows.length,
      });
    }
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

  protected async _forEachKeys(
    keyOrKeys: DataKeyOrKeys<T> | undefined,
    callback: (keys: string[]) => Promise<void>
  ): Promise<string[]> {
    let keys: string[] | null = null;

    if (!keyOrKeys && this.cursor.keys.length) {
      keys = this.cursor.keys;
      await callback(keys);
    } else if (keyOrKeys !== undefined) {
      keys = DataKeyOrKeys(keyOrKeys);
      await callback(keys);
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

  async update<T>(
    this: DataSource<T>,
    value: DataUpdateRow<T>
  ): Promise<string[]>;
  async update<T>(
    this: DataSource<T>,
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
    return this._forEachKeys(keyOrKeys, async keys => {
      await this.handleUpdate(keys, values);
    });
  }

  async add(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._forEachKeys(keyOrKeys, keys =>
      this.handleUpdateRelations(keys, [])
    );
  }

  async remove(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._forEachKeys(keyOrKeys, keys =>
      this.handleUpdateRelations([], keys)
    );
  }

  async delete(keyOrKeys?: DataKeyOrKeys<T>): Promise<string[]> {
    return this._forEachKeys(keyOrKeys, keys => this.handleDelete(keys));
  }

  as<K extends keyof Children, Children>(
    this: DataSource<WithDataUnionMetaChildren<Children>>,
    type: string & K
  ): DataSource<Children[K]> {
    return this.withCursor({ ...this.cursor, type });
  }

  of<T>(this: DataSource<T>, keyMap: Record<string, any>): DataSource<T>;

  of<T>(this: DataSource<T>, keyOrKeys: DataKeyOrKeys<T>): DataSource<T>;

  of<T, K extends string & keyof Required<T>>(
    this: DataSource<T>,
    propertyName: string & K,
    value: DataKey<T[K]>
  ): DataSource<T>;

  of(...args) {
    // of(propertyName, value)
    if (args.length === 2) {
      const [k, v] = args;
      return this.withCursor({
        ...this.cursor,
        constants: { ...this.cursor.constants, [k]: v },
      });
    }
    const [arg0] = args;
    if (typeof arg0 === "string" || Array.isArray(arg0)) {
      return this.withCursor({ ...this.cursor, keys: DataKeyOrKeys(arg0) });
    }
    return this.withCursor({
      ...this.cursor,
      constants: { ...this.cursor.constants, ...arg0 },
    });
  }

  at<K extends DataRelationKeys<T>>(
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

  skip<T>(this: DataSource<T>, count: number): DataSource<T> {
    return this.withCursor({ ...this.cursor, skip: count });
  }

  take<T>(
    this: DataSource<T>,
    count: number,
    skip: number = this.cursor.skip
  ): DataSource<T> {
    return this.withCursor({ ...this.cursor, take: count, skip });
  }

  addSort<T>(this: DataSource<T>, order: DataOrder<T>[]): DataSource<T>;
  addSort<T>(
    this: DataSource<T>,
    by: DataExp<T>,
    sort: DataSort,
    nulls?: DataNullsSort
  ): DataSource<T>;
  addSort(...args) {
    return this._sort(true, args);
  }

  sort<T>(this: DataSource<T>, orders: DataOrder<T>[]): DataSource<T>;
  sort<T>(
    this: DataSource<T>,
    by: DataExp<T>,
    sort: DataSort,
    nulls?: DataNullsSort
  ): DataSource<T>;
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
    return this.withCursor({
      ...this.cursor,
      order: add ? [this.cursor.order, ...order] : order,
    });
  }

  addFields<T, Fields extends DataFields<T>>(
    this: DataSource<T>,
    fields: Fields
  ): DataSource<T & DataFieldsRow<T, Fields>> {
    return this.withCursor({
      ...this.cursor,
      selection: DataSelection.merge(this.cursor.selection, { fields }),
    });
  }

  filter<T>(this: DataSource<T>, ...exps: DataExp<T>[]): DataSource<T> {
    const filter = DataExp({ $and: exps as any });
    if (filter === undefined) return this;
    return this.withCursor({
      ...this.cursor,
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
}
