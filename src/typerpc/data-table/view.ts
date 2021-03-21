import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { Debounce } from "@dabsi/common/async/Debounce";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapAndFilterObject } from "@dabsi/common/object/mapAndFilterObject";
import { mapObject } from "@dabsi/common/object/mapObject";
import { omit } from "@dabsi/common/object/omit";
import {
  AnyDataTable,
  DataTable,
  DataTableType,
} from "@dabsi/typerpc/data-table/rpc";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import {
  WidgetView,
  WidgetViewProps,
} from "@dabsi/typerpc/widget/view/component";
import { WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { ReactElement } from "react";

export type DataTableViewProps<
  C extends RpcConnection<AnyDataTable>
> = WidgetViewProps<C> & {
  onCheckChanged?(checkMap: Record<string, boolean> | null);
};

export class DataTableView<
  C extends RpcConnection<AnyDataTable>
> extends WidgetView<
  C,
  DataTableViewProps<C> & {
    children(view: DataTableView<C>): ReactElement;
  }
> {
  protected reloadDebounce = Debounce(500);

  @ViewState() searchText: string = this.elementState?.query.text || "";
  @ViewState() pageSize!: number;
  @ViewState() pageIndex = this.elementState?.query.pageIndex || 0;

  @ViewState() totalRows!: number;
  @ViewState() rows!: DataTable.QueryResultRow<DataTableType<C>>[];

  @ViewState() isLoading = false;

  // locationStateKey=""
  // @ViewHook(()=> useLocationState()) locationState: LocationState;

  @ViewState("updateCheckMap") protected _checkMap: Record<
    string,
    boolean
  > = {};

  updateCheckMap() {
    if (!this.isDidMount) return;
    this.props.onCheckChanged?.(
      hasKeys(this._checkMap) ? { ...this._checkMap } : null
    );
  }

  isChecked(rowKey: string): boolean {
    return this._rowsState.checkMap[rowKey] || false;
  }

  get allChecked(): boolean {
    return this._rowsState.allChecked;
  }

  toggleCheck(row: { $key: string; $checked?: boolean }) {
    if (row.$key in this._checkMap) {
      this._checkMap = omit(this._checkMap, row.$key);
    } else {
      this._checkMap = {
        ...this._checkMap,
        [row.$key]: !row.$checked,
      };
    }
  }

  isCheckChanged(rowKey: string) {
    return rowKey in this._checkMap;
  }

  @ViewState() protected get _rowsState(): {
    checkMap: Record<string, boolean>;
    allChecked: boolean;
  } {
    const checkMap = {};
    let allChecked = true;
    for (const row of this.rows) {
      const checked = (checkMap[row.$key] =
        this._checkMap[row.$key] ?? (row.$checked || false));
      allChecked &&= checked;
    }
    return { checkMap, allChecked };
  }

  checkAll(inverse: boolean = false) {
    const checkMap = { ...this._checkMap };
    for (const row of this.rows) {
      if (inverse ? !row.$checked : row.$checked) {
        delete checkMap[row.$key];
      } else {
        checkMap[row.$key] = !inverse;
      }
    }
    this._checkMap = checkMap;
  }

  toggleAll() {
    this.checkAll(this._rowsState.allChecked);
  }

  protected updateElement(element: WidgetElement<C>) {
    this.rows = element.rows || [];
    this.totalRows = element.totalRows ?? 0;
    this.pageSize =
      this.elementState?.query?.pageSize || element.pageSize || 10;
  }

  @ViewState() columns: Record<
    string,
    {
      sort?: "ASC" | "DESC";
      nulls?: "FIRST" | "LAST";
    }
  > = {};

  get lastPage() {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  setPageIndex(pageIndex: number) {
    this.pageIndex = Math.min(this.lastPage - 1, pageIndex);
    this.reload();
  }

  setRelativePage(count: number) {
    this.setPageIndex(this.pageIndex + count);
  }

  setPageSize(pageSize: number) {
    pageSize = this.pageSize = 1 > pageSize ? 1 : pageSize;
  }

  async search(text: string) {
    this.searchText = text;
    this.pageIndex = 0;
    this.reloadWithDebounce();
  }

  clearSearch() {
    this.searchText = "";
  }

  componentDidMount() {
    super.componentDidMount();
  }

  protected _toggleSortOrNulls<K extends "sort" | "nulls">(
    key: string,
    p: K,
    v1: { sort: "ASC" | "DESC"; nulls: "FIRST" | "LAST" }[K],
    v2: { sort: "ASC" | "DESC"; nulls: "FIRST" | "LAST" }[K]
  ) {
    const column = this.columns[key];
    let value: typeof column[typeof p] = column[p];

    switch (value) {
      case v1:
        value = undefined;
        break;
      case v2:
        value = v1;
        break;
      case undefined:
        value = v2;
        break;
    }
    this.columns = {
      ...this.columns,
      [key]: { ...column, [p]: value },
    };
  }

  toggleNulls(key: string) {
    this._toggleSortOrNulls(key, "sort", "ASC", "DESC");
  }

  toggleSort(key: string) {
    this._toggleSortOrNulls(key, "nulls", "FIRST", "LAST");
  }

  async reloadWithDebounce() {
    if (!(await this.reloadDebounce())) return;
    await this.reload();
  }

  async reloadAfterRemove(key: string) {
    // TODO
    return this.reload();
  }

  resetAndReload() {
    this._checkMap = {};
    return this.reload();
  }

  async reload() {
    if (this.isLoading) return;
    this.isLoading = true;
    const getCount = this.totalRows === 0 || this.pageIndex === 0;
    const { totalRows, rows } = await this.connection.query({
      getCount,
      order: mapAndFilterObject(this.columns, column => {
        const { nulls, sort } = column;
        if (nulls || sort) {
          return { nulls, sort };
        }
      }),
      text: this.searchText,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    });

    if (getCount) {
      this.totalRows = totalRows;
    }
    this.rows = rows;

    this.isLoading = false;
  }

  renderView(): React.ReactNode {
    return this.props.children!(this);
  }
}
function mapObect(
  _checkMap: Record<string, boolean>,
  arg1: () => void
): Record<string, boolean> {
  throw new Error("Function not implemented.");
}
