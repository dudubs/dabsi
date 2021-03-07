import { ReactElement } from "react";
import { Debounce } from "@dabsi/common/async/Debounce";
import { mapAndFilterObject } from "@dabsi/common/object/mapAndFilterObject";

import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetView } from "@dabsi/typerpc/widget/WidgetView";
import { WidgetElement, WidgetType } from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { AnyDataTable } from "@dabsi/typerpc/widget/data-table/rpc";

export type DataTableViewProps<
  C extends RpcConnection<AnyDataTable>
> = WidgetViewProps<C>;

export type DataTableViewState = {
  searchText?: string;
  pageSize?: number;
  pageIndex?: number;
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
  @ViewState() rows!: WidgetType<C>["Types"]["RowWithKey"][];
  @ViewState() isLoading = false;

  // locationStateKey=""
  // @ViewHook(()=> useLocationState()) locationState: LocationState;

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
