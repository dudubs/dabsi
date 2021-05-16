import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Debounce2 } from "@dabsi/common/async/Debounce";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObject } from "@dabsi/common/object/mapObject";
import { omit } from "@dabsi/common/object/omit";
import Lazy from "@dabsi/common/patterns/Lazy";
import { DataNullsSort, DataSort } from "@dabsi/typedata/order";
import {
  AnyDataTable,
  DataColumnType,
  DataTable,
  DataTableQuery,
  DataTableRow,
  InferredDataTableRow,
} from "@dabsi/typerpc2/data-table/rpc";
import { getRpcType } from "@dabsi/typerpc2/Rpc";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";

export type DataTableViewProps<
  T extends AnyDataTable,
  ColumnProps
> = WidgetViewProps<T> & {
  searchDebounceMs?: number;
  columns?: {
    [K in keyof T]?: ColumnProps;
  };
};
export type DataTableViewColumn<ColumnProps> = {
  key: string;
  type: DataColumnType;
  props: ColumnProps;
};

export class DataTableView<
  T extends AnyDataTable,
  ColumnProps = {},
  ColumnState = {},
  U = InferredDataTableRow<T>
> extends WidgetView<
  T,
  DataTableViewProps<T, ColumnProps> & {
    getColumnState?(column: DataTableViewColumn<ColumnProps>): ColumnState;
    children?(view: DataTableView<T, ColumnProps, ColumnState>);
  }
> {
  protected _searchDebounce = new Debounce2(this.props.searchDebounceMs || 500);

  protected _queryDebounce = new Debounce2(0);

  @ViewState("forceUpdateSearchText") searchText: string = "";

  @ViewState("forceUpdateQuery") pageSize!: number;

  @ViewState("forceUpdateQuery") pageIndex!: number;

  @ViewState("forceUpdateQuery") protected _orderMap: NonNullable<
    DataTableQuery<any>["order"]
  > = {};

  @ViewState() protected _isLoading = false;

  @ViewState() protected _rows!: DataTableRow<U>[];

  @ViewState() protected _count: number | undefined;

  @ViewState() protected _queryId = 0;

  @ViewState() protected _selectMap: Record<string, boolean> = {};

  @ViewState() protected _pick: string[] = Object.keys(this.columnTypeMap);

  @Lazy() get columnTypeMap() {
    return DataTable.getColumnTypeMap(getRpcType(this.connection));
  }

  updateElement() {
    super.updateElement?.();

    ({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      rows: this._rows,
      count: this._count = this._count,
    } = this.element);
  }

  get queryId(): number {
    return this._queryId;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get count(): number | undefined {
    return this._count;
  }

  get rows(): DataTableRow<U>[] {
    return this._rows;
  }

  @ViewState() get isSelectAll() {
    return !this._rows.find(row => !this.isSelectRow(row));
  }

  @ViewState() get columns(): ({
    key: string;
    type: DataColumnType;
  } & ColumnProps &
    ColumnState)[] {
    return this._pick.map(columnKey => {
      const type = this.columnTypeMap[columnKey];
      const props = this.props.columns?.[columnKey] || {};
      return {
        key: columnKey,
        type,
        ...props,
        ...(this.props.getColumnState?.({
          key: columnKey,
          props,
          type,
        }) as ColumnState),
      };
    });
  }

  toggleColumn(columnKey, show = !this._selectMap[columnKey]) {}

  toggleAll(select = !this.isSelectAll) {
    const selectMap = (this._selectMap = { ...this._selectMap });
    for (const row of this._rows) {
      if (!select === !row.$selected) {
        delete selectMap[row.$key];
      } else {
        selectMap[row.$key] = select;
      }
    }
  }

  isSelectRow(row: DataTableRow<U>): boolean {
    return Boolean(this._selectMap[row.$key] ?? row.$selected);
  }

  isSelectRowChanged(rowKey: string): boolean {
    return rowKey in this._selectMap;
  }

  toggleSelect(row: DataTableRow<U>, select: boolean = !this.isSelectRow(row)) {
    // select && selected: omit
    // select && !selected: set
    // !select && selected: set
    // !select && !selected: omit

    if (!select === !row.$selected) {
      this._selectMap = omit(this._selectMap, row.$key);
    } else {
      this._selectMap = { ...this._selectMap, [row.$key]: select };
    }
  }

  toggleSort(columnKey: string & keyof U) {
    return this._toggleOrder(columnKey, "sort", ["ASC", "DESC"]);
  }

  toggleNulls(columnKey: string & keyof U) {
    return this._toggleOrder(columnKey, "nulls", ["FIRST", "LAST"]);
  }

  getOrder(
    columnKey: string & keyof U
  ):
    | {
        sort?: DataSort;
        nulls?: DataNullsSort;
      }
    | undefined {
    return this._orderMap[columnKey];
  }

  protected _toggleOrder<K extends "sort" | "nulls">(
    columnKey: string,
    typeKey: K,
    types: NonNullable<NonNullable<DataTableQuery<any>["order"]>[string]>[K][]
  ) {
    types = [undefined, ...types];
    const columnOrder = this._orderMap[columnKey];
    const index = types.indexOf(columnOrder?.[typeKey]);
    const nextType = types[index + 1];
    const nextColumnOrder = nextType
      ? { ...columnOrder, sort: nextType }
      : omit(columnOrder as any, typeKey);

    this._orderMap = hasKeys(nextColumnOrder)
      ? { ...this._orderMap, [columnKey]: nextColumnOrder }
      : <any>omit(this._orderMap, columnKey);
  }

  async forceUpdateSearchText() {
    this._queryDebounce.cancel();
    if (await this._searchDebounce.wait()) {
      this.pageIndex = 0;
      return this.forceUpdateQuery();
    }
  }

  async forceUpdateQuery() {
    if (!(await this._queryDebounce.wait())) return;

    const hasNewQueryPromise = this._queryDebounce.wait();

    if (this._isLoading) return;
    this._isLoading = true;
    try {
      const result = await this.connection.query({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        text: this.searchText,
        order: this._orderMap,
        count: this.pageIndex === 0,
      });

      if (await hasNewQueryPromise) return;

      this._queryId++;

      ({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        count: this._count = this._count,
      } = result);

      const { columnTypeMap } = this;
      this._rows = <any>result.rows.map(row => {
        return mapObject(row, (value, key) => {
          const type = columnTypeMap[key];
          return type ? type(value) : value;
        });
      });
    } finally {
      this._isLoading = false;
    }
  }
}
