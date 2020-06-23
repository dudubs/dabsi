import {ReactNode} from "react";
import {defined} from "../../common/object/defined";
import {Awaitable} from "../../common/typings";
import {JSONExp} from "../../json-exp/JSONExp";
import {LangNode} from "../../localization/Lang";
import {LayoutOld} from "../../react/utils/LayoutOld";
import {AfterMount} from "../../react/utils/LifecycleHooks";
import {State} from "../../react/utils/State";
import {DataItem} from "../DataItem";
import {AbstractDataList, AbstractDataListProps} from "../DataList/AbstractDataList";
import {DataOrder,} from "../DataQuery";
import {DataSource} from "../DataSource";
import {deleteAction} from "./actions/deleteAction";
import {removeAction} from "./actions/removeAction";

export type DataTableActionType = "single" | "multiple" | "both";

export type AnyDataTable<T = any> =
    DataTable<T, DataTableProps<T, DataTableColumnProps<T>>>;


export type DataTableAction<T> = {
    icon?: string;
    title: LangNode;
    type?: DataTableActionType
    handleKeys?(keys: string[], table: AnyDataTable<T>): Awaitable;
    handleItem?(item: DataItem<T>): Awaitable;
    danger?: boolean
    visible?: (item: DataItem<T>) => boolean
    disabled?: (data: DataItem<T>) => boolean
};

export type DataTableProps<T,
    ColumnProps extends DataTableColumnProps<T> = DataTableColumnProps<T>> = AbstractDataListProps<T> & {

    title?: LangNode;

    removable?: "single" | "multiple" | "both" | boolean;

    deletable?: "single" | "multiple" | "both" | boolean;

    actions?: DataTableAction<T>[];

    columns: ColumnProps[];

    multiSort?: boolean;

};

export type DataTableColumnProps<T> = {
    field?: JSONExp<T>;
    sortable?: boolean;
    title?: LangNode;
    empty?: LangNode;
    render?(props: {item:DataItem<T>,data:any}): ReactNode;
    renderContainer?(children: ReactNode): ReactNode
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


    @State('reload') columns: (DataTableColumn<T> & Props['columns'][number])[] =
        this.props.columns.map((column, index) => {
            return {
                ...column, index, key:
                    typeof column.field === "string" ? column.field :
                        `_c_${index}`
            }
        })


    multipleActions: DataTableAction<T>[] = [];

    singleActions: DataTableAction<T>[] = [];

    async executeSingleAction(action: DataTableAction<T>,
                              key: string) {
        return this.executeAction(action, [key])
    }

    async executeAction(action: DataTableAction<T>,
                        keys: string[]) {

        if (action.handleItem) {
            const {items: [item]} = await this.source.query({
                filter: {$is: keys[0]},
                take: 1
            });
            await action.handleItem?.(
                defined(item, () => `No item for key ${keys[0]}`)
            );
        }
        await action.handleKeys?.(keys, this);
    }

    async reloadRow(key: string) {
        const row = await this.source
            .select({
                ...this.columns.toObject(column => {
                    if (column.field !== undefined)
                        return [column.key, column.field];
                })
            })
            .get(key);
        this.items = this.items.map(item => item.key == key ? ({...item, row}) : item)
    }

    getQuerySource(): DataSource<any> {

        const fields: any = {};

        for (let column of this.columns) {
            if (column.field && (typeof column.field !== "string")) {
                fields[column.key] = column.field;
            }
        }

        return super.getQuerySource().extend(
            fields
        )
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

            const type = action.type ?? (
                action.handleKeys && action.handleItem ? "both" :
                    action.handleItem ? "single" :
                        "both");
            const isBoth = type === "both";
            if (isBoth || type === "single")
                singleActions.push(action);
            if (isBoth || type === "multiple")
                multipleActions.push(action);
        }
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


