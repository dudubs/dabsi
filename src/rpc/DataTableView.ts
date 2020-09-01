import {ReactElement} from "react";
import {mapAndFilterObject} from "../common/object/mapAndFilterObject";
import {mapObject} from "../common/object/mapObject";
import {Debounce} from "../react/utils/hooks/useDebounce";
import {ViewState} from "../react/view/ViewState";
import {DataTable, DataTableOrder} from "./DataTable";
import {AnyRpc} from "./Rpc";
import {WidgetElement} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export type DataTableViewProps<T, R extends AnyRpc> = WidgetViewProps<DataTable<T, R>> & {};

export class DataTableView<T, R extends AnyRpc>
    extends WidgetView<DataTable<T, R>, DataTableViewProps<T, R> & {
        children(view: Readonly<DataTableView<T, R>>): ReactElement
    }> {

    @ViewState('reload') text: string = "";
    @ViewState('reload') pageSize = 0;
    @ViewState('reload') page = 0;

    @ViewState() count: number;
    @ViewState() rows: [string, T][];
    @ViewState() isLoading = false;

    protected updateElement(element: WidgetElement<DataTable<T, R>> | undefined) {
        this.rows = this.element?.rows || [];
        this.count = this.element?.count ?? 0
    }

    @ViewState() columns: Record<string, {
        sort?: "ASC" | "DESC"
        nulls?: "FIRST" | "LAST"
    }> = {};

    get lastPage() {
        return Math.ceil(this.count / this.pageSize);
    }

    setPage(page: number) {
        const {lastPage} = this;
        this.page = page > lastPage ? lastPage :
            0 > page ? 0 : page;
    }

    setRelativePage(count: number) {
        this.setPage(this.page + count)
    }


    setPageSize(pageSize: number) {
        this.pageSize = 1 > pageSize ? 1 : pageSize;
    }

    search(text: string) {
        this.text = text;
    }

    clearSearch() {
        this.text = "";
    }

    protected _toggleSortOrNulls<K extends "sort" | "nulls">(
        key: string,
        p: K,
        v1: DataTableOrder[K],
        v2: DataTableOrder[K],
    ) {
        const column = this.columns[key];
        let value: (typeof column)[typeof p] = column[p];

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
            [key]: {...column, [p]: value}
        }
    }

    toggleNulls(key: string) {
        this._toggleSortOrNulls(key, "sort", "ASC", "DESC");

    }

    toggleSort(key: string) {
        this._toggleSortOrNulls(key, "nulls", "FIRST", "LAST");
    }

    protected reloadDebounce = Debounce();

    async reload() {
        if (!this.isDidMount) {
            if (this.props.connection.props.loadOnElement) {
                return;
            }
        }
        this.isLoading = true;
        if (await this.reloadDebounce.wait()) return;
        const getCount = (this.count === 0) && (this.page === 0);
        const {count, rows} = await this.props.connection.getRows({
            getCount,
            order: mapAndFilterObject(this.columns, column => {
                const {nulls, sort} = column;
                if (nulls || sort) {
                    return {nulls, sort}
                }
            }),
            text: this.text,
            take: this.pageSize,
            skip: this.page * this.pageSize
        });

        if (getCount) {
            this.count = count;
        }
        this.rows = rows;
        this.isLoading = false;
    }

    renderView(): React.ReactNode {
        return this.props.children(this)
    }

}

