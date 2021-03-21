import { DataCursor, EMPTY_DATA_CURSOR } from "@dabsi/typedata/cursor";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source/source";
import { DataUpdateRow, DataInsertRow } from "@dabsi/typedata/value";

export class DataEmptySource<T> extends DataSource<T> {
  async getRows(): Promise<DataRow<T, {}>[]> {
    return [];
  }
  async getCountRows(): Promise<number> {
    return 0;
  }
  async hasRows(): Promise<boolean> {
    return false;
  }

  constructor(public cursor: DataCursor<any> = EMPTY_DATA_CURSOR) {
    super();
  }

  withCursor<T>(cursor: DataCursor<any>): DataSource<T> {
    return new DataEmptySource(cursor);
  }

  protected handleDelete(keys: string[]): Promise<void> {
    return Promise.resolve();
  }

  protected handleGetTree(
    inverse: boolean,
    relationPropertyName: string
  ): Promise<
    DataRow<
      T,
      {
        $path: string;
        $depth: number;
        $children: DataRow<T, any>[];
        $parent?: DataRow<T, any> | undefined;
      }
    >[]
  > {
    return Promise.resolve([]);
  }

  protected handleUpdate(
    keys: string[],
    value: DataUpdateRow<T>
  ): Promise<number> {
    return Promise.resolve(0);
  }
  protected handleUpdateRelations(
    keysToAdd: string[],
    keysToRemove: string[]
  ): Promise<void> {
    return Promise.resolve();
  }
  protected insertKeys<T>(datas: DataInsertRow<T>[]): Promise<string[]> {
    return Promise.resolve([]);
  }
}
