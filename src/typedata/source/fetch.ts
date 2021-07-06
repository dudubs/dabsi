import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import notNull from "@dabsi/common/object/notNull";
import { RebaseType } from "@dabsi/typedata/BaseType";
import { DataKey } from "@dabsi/typedata/key";
import { DataRelationTreeKeys } from "@dabsi/typedata/relation";
import { DataRow, DataTreeRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source/source";

declare global {
  namespace TypeData {
    interface IDataSource<T> {
      fetch<T>(
        this: DataSource<T>,
        key?: DataKey<T>
      ): Promise<DataRow<T> | null>;

      fetchOrFail<T>(
        this: DataSource<T>,
        key?: DataKey<T>
      ): Promise<DataRow<T>>;

      fetchAll<T, S extends DataSelection<T> = {}>(
        this: DataSource<T>,
        selection?: S
      ): Promise<DataRow<DataSelectionRow<T, S>>[]>;

      fetchTreeOf<T>(
        this: DataSource<T>,
        relationName: string & DataRelationTreeKeys<RebaseType<T>>
      ): Promise<DataTreeRow<T>[]>;

      fetchTreeAt<T>(
        this: DataSource<T>,
        relationName: string & DataRelationTreeKeys<RebaseType<T>>,
        childToParent?: boolean
      ): Promise<DataRow<T>[][]>;

      fetchMap<T>(this: DataSource<T>): Promise<Record<string, DataRow<T>>>;

      fetchKeys(): Promise<string[]>;
    }
  }
}

DataSource.prototype.fetchAll = async function (
  this: DataSource<any>,
  selection?
): Promise<any[]> {
  return this.select(selection as {}).handleFetch(this);
};

DataSource.prototype.fetch = function (this: DataSource<any>, key?) {
  return this.let(s => (key !== undefined ? s.of(key) : s))
    .take(1)
    .handleFetch(this)
    .then(rows => rows[0]);
};

DataSource.prototype.fetchOrFail = function (key) {
  return this.fetch(key).then(row => {
    return notNull(row, () => `No row.`);
  });
};

DataSource.prototype.fetchTreeOf = function (
  this: DataSource<any>,
  relationName
) {
  return <any>this.handleFetchTree(this, false, relationName);
};

DataSource.prototype.fetchTreeAt = async function (
  this: DataSource<any>,
  relationName,
  childToParent = false
) {
  const children = await this.handleFetchTree(this, true, relationName);

  return <any>[
    //
    ...flat(children, []),
  ];

  function* flat(
    children: DataTreeRow<any>[],
    parents: DataTreeRow<any>[]
  ): IterableIterator<DataTreeRow<any>[]> {
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
};

DataSource.prototype.fetchMap = async function () {
  return mapArrayToObject(await this.fetchAll(), row => [row.$key, row]);
};

DataSource.prototype.fetchKeys = function (this: DataSource<any>) {
  return this._selectKeys()
    .fetchAll()
    .then(rows => rows.map(row => row.$key));
};
