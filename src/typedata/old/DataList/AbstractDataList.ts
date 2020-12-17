import { Component, ReactNode } from "react";
import { ImmutableSet } from "@dabsi/immutable2";
import { DataExp } from "@dabsi/typedata/DataExp";
// import { Debounce } from "@dabsi/react/utils/hooks/useDebounce";
import { State } from "@dabsi/react/utils/State";
import { DataKeyInput } from "@dabsi/typedata/DataKey";
import { DataOrder } from "@dabsi/typedata/DataOrder";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";

export type AbstractDataListProps<T> = {
  source: DataSource<T>;

  searchIn?: DataExp<T>[];

  pageSize?: number;
};

// TODO: Merge to AbstractDataTable class.
export abstract class AbstractDataList<
  T,
  Props extends AbstractDataListProps<T>
> extends Component<Props> {
  reloadDebounce = Debounce(100);

  @State() items: DataRow<T>[] = [];

  @State() isLoading = false;

  @State("reload") pageSize = this.props.pageSize ?? 10;

  @State("reload") page = 0;

  @State() totalCount: number = 0;

  @State("search") text: string = "";

  @State("reload") sort?: DataOrder<T>;

  @State() selectedKeys = ImmutableSet<string>();

  @State() selectAll = false;

  @State("reload") source: DataSource<T> = this.props.source;

  updateSource(getSource: (source: DataSource<T>) => DataSource<T>) {
    this.source = getSource(this.props.source);
    this.totalCount = 0;
  }

  toggleSelect(key: string) {
    this.selectedKeys = this.selectedKeys.has(key)
      ? this.selectedKeys.clear()
      : this.selectedKeys.clear().add(key);
  }

  abstract getOrder(): DataOrder<T>[];

  getQuerySource(): DataSource<T> {
    let {
      text,
      props: { searchIn },
    } = this;

    const textFilter = !(text && searchIn)
      ? undefined
      : {
          $and: searchIn.map(exp => ({ $search: { in: exp, text } })),
        };

    return this.source.updateCursor(cursor => {
      cursor.order = [...(!this.sort ? [] : [this.sort]), ...this.getOrder()];
      cursor.filter = DataExp(cursor.filter, textFilter);
      cursor.skip = this.pageSize * this.page;
      cursor.take = this.pageSize;
      return cursor;
    });
  }

  // TODO: reload(row?)
  async reloadItem(item: DataKeyInput<T>) {
    return this.reload();
  }

  async reload() {
    this.isLoading = true;
    if (await this.reloadDebounce.wait()) return;

    if (!this.totalCount) {
      [
        this.totalCount,
        this.items,
      ] = await this.getQuerySource().getCountAndRows();
    } else {
      this.items = await this.getQuerySource().getRows();
    }
    this.isLoading = false;
  }

  async search() {
    this.totalCount = 0;
    this.page = 0;
    await this.reload();
  }

  abstract render(): ReactNode;
}
