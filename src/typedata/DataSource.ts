// TODO: DataSource.clone(), DataSource.freeze()
import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Type } from "@dabsi/common/typings2/Type";
import { BaseType, GetBaseType } from "@dabsi/typedata/BaseType";
import { chunks } from "@dabsi/typedata/chunks";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import {
  AnyDataSelection,
  DataPickableKeys,
  DataSelection,
} from "@dabsi/typedata/data-selection/DataSelection";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataCursor } from "@dabsi/typedata/DataCursor";
import { DataFields, DataFieldsRow } from "@dabsi/typedata/DataFields";
import { DataKey, DataKeyInput } from "@dabsi/typedata/DataKey";
import { DataNullsSort, DataOrder, DataSort } from "@dabsi/typedata/DataOrder";
import { DataRelationKeys, DataRelationType } from "@dabsi/typedata/DataRelation";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSourceRow } from "@dabsi/typedata/DataSourceRow";
import { DataUnionChildren } from "@dabsi/typedata/DataUnion";
import { DataInsert, DataUpdate } from "@dabsi/typedata/DataValue";

export type DataKeyOrKeysInput<T> = DataKeyInput<T>[] | DataKeyInput<T>;
export type DataSourceAt<T, K extends DataRelationKeys<T>> = DataSource<
  DataRelationType<Required<T>[K]>
>;

export function DataKeyOrKeys<T>(keyOrKeys: DataKeyOrKeysInput<T>): string[] {
  if (Array.isArray(keyOrKeys)) return keyOrKeys.map(DataKey);
  return [DataKey(keyOrKeys)];
}

export type BasedDataSource<T> = DataSource<BaseType<T> & { _ }>;

type _Path = {
  type: "at" | "hasAt";
  parent?: _Path;
  filter?: DataExp<any>;
  propertyName: string;
};

export abstract class DataSource<T> {
  // TODO: rename to getCountAndRows

  TData?: T;

  async getCountAndRows(): Promise<[number, DataRow<T>[]]> {
    // TODO: Optimizing
    return [await this.getCount(), await this.getRows()];
  }

  // TODO: rename to getRows()
  abstract getRows(): Promise<DataRow<T>[]>;

  next(pageSize: number): DataSource<T> {
    return this.updateCursor({
      skip: this.cursor.skip + pageSize,
    });
  }

  getKeys(): Promise<string[]> {
    return this.selectKeys()
      .getRows()
      .then(rows => rows.map(row => row.$key));
  }

  selectKeys(): DataSource<{}> {
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
      source = source.next(rows.length);
    }
  }

  abstract getCount(): Promise<number>;

  abstract hasRow(): Promise<boolean>;

  //
  async touch<T>(
    this: DataSource<T>,
    // TODO: Exclude keys .of(key, value)
    insert?: DataInsert<T>
  ): Promise<DataRow<T>> {
    return (await this.get()) || (await this.insert(insert || ({} as any)));
  }

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

  async updateRelations(keyMap: Record<string, boolean>) {
    const existsKeys = new Set(
      await this.filter({
        $is: Object.keys(keyMap),
      }).getKeys()
    );

    const keysToAdd: string[] = [];
    const keysToRemove: string[] = [];

    for (const [key, toAdd] of entries(keyMap)) {
      if (toAdd) {
        !existsKeys.has(key) && keysToAdd.push(key);
      } else {
        existsKeys.has(key) && keysToRemove.push(key);
      }
    }
    keysToAdd.length && (await this.addKeys(keysToAdd));
    keysToRemove.length && (await this.removeKeys(keysToRemove));
  }

  protected abstract addKeys(keys: string[]): Promise<void>;

  protected abstract removeKeys(keys: string[]): Promise<void>;

  protected abstract deleteKeys(keys: string[]): Promise<void>;

  protected abstract updateKeys(
    keys: string[],
    value: DataUpdate<T>
  ): Promise<number>;

  insertKey(value: DataInsert<T>): Promise<string> {
    return this.insertKeys([value]).then(keys => keys[0]);
  }

  abstract insertKeys<T>(value: DataInsert<T>[]): Promise<string[]>;

  protected async _each(
    keyOrKeys: DataKeyOrKeysInput<T> | undefined,
    callback: (keys: string[]) => Promise<void>
  ) {
    if (keyOrKeys !== undefined) {
      if (Array.isArray(keyOrKeys)) {
        return callback(keyOrKeys.map(DataKey));
      }
      return callback([DataKey(keyOrKeys)]);
    }

    for await (const rows of chunks(this.selectKeys().find(), 100)) {
      await callback(rows.map(row => row.$key));
    }
  }

  async update(value: DataUpdate<T>): Promise<number>;
  async update(
    keyOrKeys: DataKeyOrKeysInput<T>,
    value: DataUpdate<T>
  ): Promise<number>;
  async update(...args): Promise<number> {
    let values;
    let keyOrKeys = undefined;
    if (args.length === 1) {
      [values] = args;
    } else {
      [keyOrKeys, values] = args;
    }
    let affectedRows = 0;
    await this._each(keyOrKeys, async keys => {
      affectedRows += await this.updateKeys(keys, values);
    });
    return affectedRows;
  }

  async add(keyOrKeys?: DataKeyOrKeysInput<T>) {
    return this._each(keyOrKeys, keys => this.addKeys(keys));
  }

  async remove(keyOrKeys?: DataKeyOrKeysInput<T>) {
    return this._each(keyOrKeys, keys => this.removeKeys(keys));
  }

  async delete(keyOrKeys?: DataKeyOrKeysInput<T>) {
    return this._each(keyOrKeys, keys => this.deleteKeys(keys));
  }

  insert<T>(this: DataSource<T>, value: DataInsert<T>): Promise<DataRow<T>>;
  insert<T>(
    this: DataSource<T>,
    values: DataInsert<T>[]
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

  abstract cursor: DataCursor;

  protected abstract withCursor<T>(cursor: DataCursor): DataSource<T>;

  // asMutable()
  // asImmutable()

  updateCursor<U = T>(
    callbackOrCursor: ((cursor: DataCursor) => DataCursor) | Partial<DataCursor>
  ): DataSource<U> {
    return this.withCursor<U>(
      typeof callbackOrCursor === "function"
        ? callbackOrCursor({ ...this.cursor })
        : { ...this.cursor, ...callbackOrCursor }
    );
  }

  as<K extends keyof Children, Children>(
    this: DataSource<DataUnionChildren<Children>>,
    type: string & K
  ): DataSource<Children[K]> {
    return this.updateCursor({
      type,
    });
  }

  T?: T;

  of<T, K extends string & keyof Required<T>>(
    this: DataSource<T>,
    propertyName: string & K,
    value: DataKeyInput<T[K]>
  ): DataSource<T> {
    return this.withCursor(
      DataCursor.of(this.cursor, propertyName, DataKey(value))
    );
  }

  at<T, K extends DataRelationKeys<T>>(
    this: DataSource<T>,
    propertyName: string & K,
    key: DataKeyInput<DataRelationType<T[K]>>
  ): DataSourceAt<T, K> {
    return this.withCursor(
      DataCursor.at(this.cursor, propertyName, DataKey(key))
    );
  }

  skip(count: number): DataSource<T> {
    return this.updateCursor({ skip: count });
  }

  take(count: number): DataSource<T> {
    return this.updateCursor({ take: count });
  }

  sort(orders: DataOrder<T>[]): DataSource<T>;
  sort(by: DataExp<T>, sort: DataSort, nulls?: DataNullsSort): DataSource<T>;
  sort(expOrOrders, sort?, nulls?) {
    if (typeof sort === "string")
      return this.updateCursor({
        order: [
          ...this.cursor.order,
          { by: expOrOrders, sort: <DataSort>sort, nulls },
        ],
      });
    return this.updateCursor({ order: expOrOrders });
  }

  select<T, S extends DataSelection<T> = {}>(
    this: DataSource<T>,
    selection: S | undefined
  ): DataSource<DataSelectionRow<T, S>> {
    if (!hasKeys(selection)) return <any>this;
    return this.updateCursor({
      selection: DataSelection.merge(
        this.cursor.selection,
        <AnyDataSelection>selection
      ),
    });
  }

  pick<T, Fields extends DataFields<T>>(
    this: DataSource<T>,
    fields: Fields
  ): DataSource<
    DataSelectionRow<T, { pick: readonly never[]; fields: Fields }>
  >;

  pick<T, K extends DataPickableKeys<T>>(
    this: DataSource<T>,
    keys: readonly K[]
  ): DataSource<DataSelectionRow<T, { pick: K[] }>>;

  pick<T, K extends DataPickableKeys<T>, Fields extends DataFields<T>>(
    this: DataSource<T>,
    keys: readonly K[],
    fields: Fields
  ): DataSource<DataSelectionRow<T, { pick: K[]; fields: Fields }>>;

  pick(this: DataSource<T>, keysOrFields, maybeFields?): any {
    let fields;
    let keys;

    if (maybeFields) {
      [keys, fields] = [keysOrFields, maybeFields];
    } else if (Array.isArray(keysOrFields)) {
      [keys, fields] = [keysOrFields, {}];
    } else {
      [keys, fields] = [[], keysOrFields];
    }

    return this.select({
      pick: keys,
      fields,
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
    const filter = DataExp({ $and: exps });
    if (typeof filter === "undefined") return this;
    return this.updateCursor(cursor => {
      cursor.filter = DataExp(this.cursor.filter, filter);
      return cursor;
    });
  }
}

export type DataCursorPath = {
  // TODO: rename to "onwer"
  invert: boolean;
  propertyName: string;
  key: string;
};

export type GetDataSource = <T>(type: Type<T>) => DataSource<T>;
export type DataContext = { getDataSource: GetDataSource };
