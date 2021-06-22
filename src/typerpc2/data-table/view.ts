import Debounce from "@dabsi/common/async/Debounce";
import withDebounce from "@dabsi/common/async/withDebounce";
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
  DataTableQueryResult,
  DataTableRow,
  InferredDataTableRow,
} from "@dabsi/typerpc2/data-table/rpc";
import { getRpcType } from "@dabsi/typerpc2/Rpc";
import WidgetView, { WidgetViewProps } from "@dabsi/typerpc2/widget/WidgetView";
import ViewState from "@dabsi/view/react/ViewState";

export type DataTableViewProps<
  T extends AnyDataTable,
  ColumnProps
> = WidgetViewProps<T> & {
  searchDebounceMs?: number;
  onSelect?(view: DataTableView<T>): void;
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
  ColumnState = {}
> extends WidgetView<
  T,
  DataTableViewProps<T, ColumnProps> & {
    getColumnState?(column: DataTableViewColumn<ColumnProps>): ColumnState;
    children?(view: DataTableView<T, ColumnProps, ColumnState>);
  }
> {
  protected _queryDebounce = new Debounce(0);

  @ViewState("forceUpdateSearchText") searchText: string = "";

  @ViewState("forceUpdateQuery") protected _pageSize!: number;

  @ViewState("forceUpdateQuery") protected _pageIndex!: number;

  @ViewState("forceUpdateQuery") protected _orderMap: NonNullable<
    DataTableQuery<any>["order"]
  > = {};

  @ViewState() protected _isLoading = false;

  @ViewState() protected _rows!: DataTableRow<InferredDataTableRow<T>>[];

  @ViewState() protected _count: number | undefined;

  @ViewState() protected _selectedMap: Record<string, boolean> = {};

  @ViewState() protected _pick: string[] = Object.keys(this.columnTypeMap);

  @Lazy() get columnTypeMap() {
    return DataTable.getColumnTypeMap(getRpcType(this.connection));
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get count(): number | undefined {
    return this._count;
  }

  get rows(): DataTableRow<InferredDataTableRow<T>>[] {
    return this._rows;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get maxPageIndex(): number | undefined {
    if (this._count) {
      return this._count / this._pageSize;
    }
  }

  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    // update page index relative to max-page-index
    this.pageIndex = this._pageIndex;
  }

  set pageIndex(pageIndex: number) {
    this._pageIndex = Math.max(Math.min(pageIndex, this.maxPageIndex || 0), 0);
  }

  @ViewState() get isSelectedAll() {
    return !this._rows.find(row => !this.isSelectedRow(row));
  }

  @ViewState() get hasSelectionChanges() {
    return hasKeys(this._selectedMap);
  }

  getSelectedMap(): Record<string, boolean> {
    return { ...this._selectedMap };
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

  toggleColumn(columnKey, show = !this._selectedMap[columnKey]) {}

  protected _emitSelect = withDebounce(0, () => this.props.onSelect?.(this));

  selectAll(select = !this.isSelectedAll) {
    const selectedMap = (this._selectedMap = { ...this._selectedMap });
    for (const row of this._rows) {
      if (!select === !row.$selected) {
        delete selectedMap[row.$key];
      } else {
        selectedMap[row.$key] = select;
      }
    }
    this._emitSelect();
  }

  isSelectedRow(row: DataTableRow<InferredDataTableRow<T>>): boolean {
    return Boolean(this._selectedMap[row.$key] ?? row.$selected);
  }

  isSelectedRowChanged(rowKey: string): boolean {
    return rowKey in this._selectedMap;
  }

  selectRow(
    row: DataTableRow<InferredDataTableRow<T>>,
    select: boolean = !this.isSelectedRow(row)
  ) {
    // select && selected: omit
    // select && !selected: set
    // !select && selected: set
    // !select && !selected: omit

    if (!select === !row.$selected) {
      this._selectedMap = omit(this._selectedMap, row.$key);
    } else {
      this._selectedMap = { ...this._selectedMap, [row.$key]: select };
    }
    this._emitSelect();
  }

  toggleSort(columnKey: string & keyof InferredDataTableRow<T>) {
    return this._toggleOrder(columnKey, "sort", ["ASC", "DESC"]);
  }

  toggleNulls(columnKey: string & keyof InferredDataTableRow<T>) {
    return this._toggleOrder(columnKey, "nulls", ["FIRST", "LAST"]);
  }

  getOrder(
    columnKey: string & keyof InferredDataTableRow<T>
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

  updateElement() {
    super.updateElement?.();
    this._setQueryResult(this.element);
  }

  protected _setQueryResult(result: DataTableQueryResult<any>) {
    ({
      pageIndex: this._pageIndex,
      pageSize: this._pageSize,
      count: this._count = this._count,
    } = result);

    const { columnTypeMap } = this;

    this._rows = <any>result.rows.map(row => {
      return mapObject(row, (value, key) => {
        const type = columnTypeMap[key];
        return type ? type(value) : value;
      });
    });
  }

  forceUpdateSearchText() {
    this.pageIndex = 0;
  }

  async forceUpdateQuery() {
    if (!this.isDidUpdateElement) return;

    if (!(await this._queryDebounce.wait())) return;

    const isStillLastQueryPromise = this._queryDebounce.wait();

    if (this._isLoading) return;
    this._isLoading = true;

    try {
      const result = await this.connection.query({
        pageIndex: this._pageIndex,
        pageSize: this._pageSize,
        text: this.searchText,
        order: this._orderMap,
        count: this._count === undefined,
      });

      if (!(await isStillLastQueryPromise)) return;

      this._setQueryResult(result);
    } finally {
      this._isLoading = false;
    }
  }
}
