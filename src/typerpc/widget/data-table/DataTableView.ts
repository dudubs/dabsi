import { ReactElement } from "react";
import { mapAndFilterObject } from "../../../common/object/mapAndFilterObject";
import { Debounce } from "../../../react/utils/hooks/useDebounce";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyDataTable } from "./DataTable";
import { WidgetElement, WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";

export type DataTableViewProps<
  C extends RpcConnection<AnyDataTable>
> = WidgetViewProps<C>;

export class DataTableView<
  C extends RpcConnection<AnyDataTable>
> extends AbstractWidgetView<
  C,
  DataTableViewProps<C> & {
    children(view: Readonly<DataTableView<C>>): ReactElement;
  }
> {
  protected reloadDebounce = Debounce();

  @ViewState("reloadWithDebounce") searchText: string = "";
  @ViewState("reload") pageSize;
  @ViewState("reload") pageIndex = 0;

  @ViewState() totalRows: number;
  @ViewState() rows: WidgetType<C>["Types"]["RowWithKey"][];
  @ViewState() isLoading = false;

  protected updateElement(element: WidgetElement<C>) {
    this.rows = element.rows || [];
    this.totalRows = element.totalRows ?? 0;
    this.pageSize = element.pageSize || 10;
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
  }

  setRelativePage(count: number) {
    this.setPageIndex(this.pageIndex + count);
  }

  setPageSize(pageSize: number) {
    this.pageSize = 1 > pageSize ? 1 : pageSize;
  }

  async search(text: string) {
    this.searchText = text;
    this.pageIndex = 0;
  }

  clearSearch() {
    this.searchText = "";
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
    if (!this.isDidMount) {
      return;
    }
    this.isLoading = true;
    if (await this.reloadDebounce.wait()) return;
    await this.reload();
  }

  async reloadAfterRemove(key: string) {
    // TODO
    return this.reload();
  }

  async reload() {
    this.isLoading = true;
    const getCount = this.totalRows === 0 || this.pageIndex === 0;
    const { totalRows, rows } = await this.props.connection.controller.getRows({
      getCount,
      order: mapAndFilterObject(this.columns, column => {
        const { nulls, sort } = column;
        if (nulls || sort) {
          return { nulls, sort };
        }
      }),
      text: this.searchText,
      take: this.pageSize,
      skip: this.pageIndex * this.pageSize,
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
