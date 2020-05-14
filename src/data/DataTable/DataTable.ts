import {ReactNode} from "react";
import {Awaitable} from "../../common/typings";
import {JSONExp} from "../../json-exp/JSONExp";
import {LangNode} from "../../localization/Lang";
import {Layout} from "../../react/utils/Layout";
import {AfterMount} from "../../react/utils/LifecycleHooks";
import {State} from "../../react/utils/State";
import {DataFields} from "../DataFields";
import {DataItem} from "../DataItem";
import {AbstractDataList, AbstractDataListProps} from "../DataList/AbstractDataList";
import {DataOrder,} from "../DataQuery";
import {deleteAction} from "./actions/deleteAction";
import {removeAction} from "./actions/removeAction";

export type DataTableActionType = "single" | "multiple" | "both";

export type AnyDataTable<T = any> =
    DataTable<T, DataTableProps<T, DataTableColumnProps<T>>>;


export type DataTableAction<T> = {
    icon?: string;
    title: LangNode;
    type: DataTableActionType
    handle?(keys: string[], table: AnyDataTable<T>): Awaitable;
    danger?: boolean
};

export type DataTableProps<T,
    ColumnProps extends DataTableColumnProps<T>=DataTableColumnProps<T>> = AbstractDataListProps<T> & {

    title?: LangNode;

    removable?: "single" | "multiple" | "both" | boolean;

    deletable?: "single" | "multiple" | "both" | boolean;

    actions?: DataTableAction<T>[];

    columns: ColumnProps[];

    multiSort?: boolean;

};

export type DataTableColumnProps<T> = {
    field?: JSONExp<T>;
    layout?: Layout<DataItem<T> & { data: any }>;
    sortable?: boolean;
    title?: LangNode;
    empty?: LangNode;
    render?(children: ReactNode): ReactNode
};

export type DataSort = "ASC" | "DESC";

export type DataTableColumn<T> = {
    index: number,
    key: string;
    sort?: DataSort | undefined;
    sortNulls?: "first" | "last"
};

export abstract class DataTable<T,
    Props extends DataTableProps<T, DataTableColumnProps<T>>>
    extends AbstractDataList<T, Props> {

    @State() columns: (DataTableColumn<T> & Props['columns'][number])[] =
        this.props.columns.map((column, index) => {
            return {
                ...column, index, key:
                    typeof column.field === "string" ? column.field :
                        `_c_${index}`
            }
        })


    multipleActions: DataTableAction<T>[] = [];

    singleActions: DataTableAction<T>[] = [];

    async reloadRow(key: string) {
        const row = await this.props.source
            .select({
                ...this.columns.toObject(column => {
                    if (column.field !== undefined)
                        return [column.key, column.field];
                })
            })
            .get(key);
        this.items = this.items.map(item => item.key == key ? ({...item, row}) : item)
    }

    @AfterMount()
    protected buildActions() {
        const {multipleActions, singleActions} = this;

        this.props.actions?.forEach(build);

        enable(removeAction, this.props.removable);
        enable(deleteAction, this.props.deletable);

        function enable(action: DataTableAction<T>,
                        value: boolean | DataTableActionType | undefined) {
            value && build({
                ...action,
                type: typeof value === "string" ? value : action.type
            });
        }

        function build(action: DataTableAction<T>) {
            const isBoth = action.type === "both";
            if (isBoth || action.type === "single")
                singleActions.push(action);
            if (isBoth || action.type === "multiple")
                multipleActions.push(action);
        }
    }


    getFields(): DataFields<T> {
        return this.columns.toObject(column => {
            if (column.field !== undefined) return [
                column.key,
                column.field
            ];
        })
    }

    getOrder(): DataOrder<T>[] {
        return this.columns.toSeq()
            .filter(c => c.field && c.sort)
            .map(c => ({
                by: <JSONExp<T>>c.field,
                sort: <DataSort>c.sort,
                nulls: c.sortNulls === "first" ? ("FIRST" as const) : ("LAST" as const)
            }))
            .toArray()
    }

}

