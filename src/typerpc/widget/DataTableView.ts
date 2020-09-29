import { ReactElement } from "react";
import { mapAndFilterObject } from "../../common/object/mapAndFilterObject";
import { Debounce } from "../../react/utils/hooks/useDebounce";
import { ViewState } from "../../react/view/ViewState";
import { AnyRpc, RpcConnection } from "../Rpc";
import {
  AnyDataTable,
  DataTable,
  DataTableOrder,
  DataTableRowWithKey,
} from "./DataTable";
import { WidgetElement, WidgetType } from "./Widget";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export type DataTableViewProps<
  C extends RpcConnection<AnyDataTable>
> = WidgetViewProps<C>;

export class DataTableView<
  C extends RpcConnection<AnyDataTable>
> extends WidgetView<
  C,
  DataTableViewProps<C> & {
    children(view: Readonly<DataTableView<C>>): ReactElement;
  }
> {
  protected reloadDebounce = Debounce();

  @ViewState("reloadWithDebounce") searchText: string = "";
  @ViewState("reload") pageSize;
  @ViewState("reload") page = 0;

  @ViewState() count: number;
  @ViewState() rows: DataTableRowWithKey<C>[];
  @ViewState() isLoading = false;

  protected updateElement(element: WidgetElement<C>) {
    this.rows = element.rows || [];
    this.count = element.count ?? 0;
    this.pageSize = element.pageSize || element?.rows?.length || 10;
  }

  @ViewState() columns: Record<
    string,
    {
      sort?: "ASC" | "DESC";
      nulls?: "FIRST" | "LAST";
    }
  > = {};

  get lastPage() {
    return Math.ceil(this.count / this.pageSize);
  }

  setPage(page: number) {
    const { lastPage } = this;
    this.page = page > lastPage ? lastPage : 0 > page ? 0 : page;
  }

  setRelativePage(count: number) {
    this.setPage(this.page + count);
  }

  setPageSize(pageSize: number) {
    this.pageSize = 1 > pageSize ? 1 : pageSize;
  }

  async search(text: string) {
    this.searchText = text;
    this.page = 0;
  }

  clearSearch() {
    this.searchText = "";
  }

  protected _toggleSortOrNulls<K extends "sort" | "nulls">(
    key: string,
    p: K,
    v1: DataTableOrder[K],
    v2: DataTableOrder[K]
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

  async reload() {
    if (!this.isDidMount) {
      return;
    }
    this.isLoading = true;
    const getCount = this.count === 0 || this.page === 0;
    const { count, rows } = await this.props.connection.getRows({
      getCount,
      order: mapAndFilterObject(this.columns, (column) => {
        const { nulls, sort } = column;
        if (nulls || sort) {
          return { nulls, sort };
        }
      }),
      text: this.searchText,
      take: this.pageSize,
      skip: this.page * this.pageSize,
    });

    if (getCount) {
      this.count = count;
    }
    this.rows = rows;
    this.isLoading = false;
  }

  renderView(): React.ReactNode {
    return this.props.children!(this);
  }
}
