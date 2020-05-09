import {Component, ReactNode} from "react";
import {Awaitable} from "../../common/typings";
import {ImmutableSet} from "../../immutable";
import {JSONExp} from "../../json-exp/JSONExp";
import {LangNode} from "../../localization/Lang";
import {Debounce} from "../../react/utils/hooks/useDebounce";
import {Layout} from "../../react/utils/Layout";
import {AfterMount} from "../../react/utils/LifecycleHooks";
import {State} from "../../react/utils/State";
import {DataFields} from "../DataFields";
import {DataItem} from "../DataItem";
import {DataFieldsItem, DataOrder} from "../DataQuery";
import {DataSource} from "../DataSource";
import {deleteAction} from "./actions/deleteAction";
import {removeAction} from "./actions/removeAction";

export type DataTableActionType = "single" | "multiple" | "both";
export type AnyDataTable<T = any, Fields extends DataFields<T> = any> =
    DataTable<T, Fields, DataTableProps<T, Fields, DataTableColumnProps<T, Fields>>>;


export type AnyDataTableProps<T = any, Fields extends DataFields<T> = any> =
    DataTableProps<T, Fields, DataTableColumnProps<T, Fields>>;

export type DataTableAction<T, Fields extends DataFields<T>> = {
    icon?: string;
    title: LangNode;
    type: DataTableActionType
    handle?(keys: string[], table: AnyDataTable<T, Fields>): Awaitable;
    danger?: boolean
};

export type  DataTableProps<T, Fields extends DataFields<T>,
    ColumnProps extends DataTableColumnProps<T, Fields>> = {

    source: DataSource<T>;
    fields?: Fields;
    columns: ColumnProps[];
    multiSort?: boolean;
    searchIn?: JSONExp<T>[];
    pageSize?: number;

    title?: LangNode;

    removable?: "single" | "multiple" | "both" | boolean;
    deletable?: "single" | "multiple" | "both" | boolean;

    actions?: DataTableAction<T, Fields>[];

};

export type DataTableColumnProps<T, Fields extends DataFields<T>> = {
    field?: JSONExp<T>;
    layout?: Layout<DataFieldsItem<T, Fields> & { data: any }>;
    sortable?: boolean;
    title?: LangNode;
    empty?: LangNode;
    render?(children: ReactNode): ReactNode
};
export type DataTableColumnSort = "ASC" | "DESC" | undefined;

export type DataTableColumn<T, Fields extends DataFields<T>> = {
    index: number,
    key: string;
    sort?: DataTableColumnSort;
    sortNulls?: "first" | "last"
};

export abstract class DataTable<T, Fields extends DataFields<T>,
    Props extends DataTableProps<T, Fields, DataTableColumnProps<T, Fields>>>
    extends Component<Props> {

    reloadDebounce = Debounce(100);

    @State() items: DataItem<any>[] = [];

    @State() isLoading = false;

    @State('reload') pageSize = this.props.pageSize ?? 0;

    @State('reload') page = 0;

    @State() totalCount: number = 0;

    @State() columns: (DataTableColumn<T, Fields> & Props['columns'][number])[] =
        this.props.columns.map((column, index) => {
            return {
                ...column, index, key:
                    typeof column.field === "string" ? column.field :
                        `_c_${index}`
            }
        })

    @State('search') text: string = "";

    @State('reload') sort?: DataOrder<T>;

    @State() selectedKeys = ImmutableSet<string>();

    @State() selectAll = false;

    multipleActions: DataTableAction<T, Fields>[] = [];
    singleActions: DataTableAction<T, Fields>[] = [];

    toggleKey(key: string) {
        this.selectedKeys = this.selectedKeys.has(key) ? this.selectedKeys.delete(key) :
            this.selectedKeys.add(key);
    }


    @AfterMount()
    protected buildActions() {
        const {multipleActions, singleActions} = this;

        this.props.actions?.forEach(build);

        enable(removeAction, this.props.removable);
        enable(deleteAction, this.props.deletable);

        function enable(action: DataTableAction<T, Fields>,
                        value: boolean | DataTableActionType | undefined) {
            value && build({
                ...action,
                type: typeof value === "string" ? value : action.type
            });
        }

        function build(action: DataTableAction<T, Fields>) {
            const isBoth = action.type === "both";
            if (isBoth || action.type === "single")
                singleActions.push(action);
            if (isBoth || action.type === "multiple")
                multipleActions.push(action);
        }
    }


    async reloadKey(key: string) {
        const row = await this.props.source.get(key, {
            ...this.props.fields,
            ...this.columns.filter(column => column.field !== undefined)
                .toObject(column => [column.key, column.field])
        });
        this.items = this.items.map(item => item.key == key ? ({...item, row}) : item)
    }

    async search() {
        this.totalCount = 0;
        this.page = 0;
        await this.reload();
    }

    async reload() {
        this.isLoading = true;
        await this.reloadDebounce.wait();

        const fields: Record<string, JSONExp<T>> = <any>{
            ...this.props.fields
        };

        const order = Array<DataOrder<T>>();

        if (this.sort) {
            order.push(this.sort);
        }

        for (let column of this.columns) {

            if (column.field !== undefined) {
                fields[column.key] = column.field;
            }

            if (column.field && column.sort) {
                order.push({
                    by: column.field,
                    sort: column.sort,
                    nulls: column.sortNulls === "first" ? "FIRST" : "LAST"
                })
            }
        }

        const {text, props: {searchIn}} = this;
        const textFilter = !(text && searchIn) ? undefined : {
            $all: searchIn.map(exp => ({$search: {in: exp, text}}))
        };

        const result = await this.props.source.find({
            fields, order,
            skip: this.pageSize * this.page,
            take: this.pageSize,
            filter: JSONExp(
                textFilter
            )
        });

        if (result.count)
            this.totalCount = result.count;

        this.items = result.items;
        this.isLoading = false;
    }

    abstract render(): ReactNode;

}

