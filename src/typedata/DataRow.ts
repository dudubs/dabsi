import { HasKeys, IsAny, Union } from "../common/typings";
import { BaseTypeKey, RebaseType, WithBaseType } from "./BaseType";
import { DataFields, DataFieldsRow } from "./DataFields";
import { DataKey } from "./DataKey";
import { DataSource, DataValues } from "./DataSource";
import {
  DataTypeKey,
  DataUnionChildren,
  DataUnionChildrenKey,
  DataUnionChildrenOf,
} from "./DataUnion";
import { MapRelation, RelationKeys, RelationTypeAt } from "./Relation";

type DataUnionChildrenRow<Children> = {
  [K in keyof Children]: Record<DataKey, string> &
    Record<DataTypeKey, K> &
    DataRow<Children[K]>;
};

export type DataUnionRow<
  T extends DataUnionChildren<any>,
  K extends keyof DataUnionChildrenOf<T>
> = DataRow<DataUnionChildrenOf<T>[K]>;

export type DataRow<T> = T extends DataUnionChildren<infer Children>
  ? HasKeys<Children> extends true
    ? Union<DataUnionChildrenRow<Children>>
    : _NoChildren<T>
  : _NoChildren<T>;

type TDataRow = Record<DataKey, string>;

export type BaseDataRow = {
  pick<T extends TDataRow, Fields extends DataFields<T>>(
    this: T,
    fields: Fields
  ): Promise<DataRow<DataFieldsRow<T, Fields>>>;

  at<T extends TDataRow, K extends RelationKeys<T>>(
    this: T,
    relationKey: K
  ): DataSource<RelationTypeAt<T, K>>;

  delete<T extends TDataRow, K extends RelationKeys<T>>(this: T): Promise<void>;

  remove<T extends TDataRow, K extends RelationKeys<T>>(this: T): Promise<void>;

  update<T extends TDataRow>(this: T, values: DataValues<T>): Promise<boolean>;

  reload<T extends TDataRow>(this: T): Promise<DataRow<T>>;
};

export function DataBaseRow<T>(source: DataSource<T>): BaseDataRow {
  return {
    at(propertyName) {
      return <any>source.at(<any>propertyName, this.$id);
    },
    pick(fields: any): any {
      return source.pick(fields).getOrFail(this.$id);
    },
    delete() {
      return source.deleteKey(this.$id);
    },
    remove() {
      return source.removeKey(this.$id);
    },
    update(values) {
      return source.updateKey(this.$id, <any>values);
    },
    reload() {
      return <any>source.getOrFail(this.$id);
    },
  };
}

export type _NoChildren<T> = BaseDataRow &
  Omit<T, DataUnionChildrenKey | RelationKeys<T> | BaseTypeKey> &
  WithBaseType<T> &
  Record<DataKey, string> &
  {
    [K in RelationKeys<T>]: MapRelation<T[K], DataRow<RelationTypeAt<T, K>>>;
  };
