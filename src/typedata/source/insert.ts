import { DataRow } from "@dabsi/typedata/row";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source/source";
import { DataSourceRow } from "@dabsi/typedata/sourceRow";
import { DataInsertRow } from "@dabsi/typedata/value";

declare global {
  namespace TypeData {
    interface IDataSource<T> {
      insertAndFetch<T, S extends DataSelection<T> = {}>(
        this: DataSource<T>,
        rows: DataInsertRow<T>[],
        selection?: S
      ): Promise<DataRow<DataSelectionRow<T, S>>[]>;

      insertAndFetch<T, S extends DataSelection<T> = {}>(
        this: DataSource<T>,
        row: DataInsertRow<T>,
        selection?: S
      ): Promise<DataRow<DataSelectionRow<T, S>>>;

      insert<T>(this: DataSource<T>, row: DataInsertRow<T>): Promise<string>;

      insert<T>(
        this: DataSource<T>,
        rows: DataInsertRow<T>[]
      ): Promise<string[]>;

      touch<T>(
        this: DataSource<T>,
        row?: DataInsertRow<T>
      ): Promise<DataRow<T>>;
    }
  }
}

DataSource.prototype.insertAndFetch = async function (
  this: DataSource<any>,
  insertRows,
  selection?
): Promise<any> {
  // TODO: use fetchAll
  if (!Array.isArray(insertRows)) {
    return this.insertAndFetch([insertRows]).then(rows => rows[0]);
  }
  const keys = await this.handleInsert(insertRows);
  const rows = await this
    //
    .withCursor({ ...this.cursor, keys })
    .select(selection as {})
    .handleFetch(this);
  return rows;
};

DataSource.prototype.insert = function (
  this: DataSource<any>,
  rows
): Promise<any> {
  if (!Array.isArray(rows)) {
    return this.handleInsert([rows]).then(keys => keys[0]);
  }
  return this.handleInsert(rows);
};

DataSource.prototype.touch = async function (
  this: DataSource<any>,
  row
): Promise<any> {
  return (await this.fetch()) || (await this.insertAndFetch(row || {}));
};
