import Table, {TableProps} from "@material-ui/core/Table";
import TableBody, {TableBodyProps} from "@material-ui/core/TableBody";
import TableFooter, {TableFooterProps} from "@material-ui/core/TableFooter";
import TableHead, {TableHeadProps} from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, {ReactNode, useState} from "react";
import {PartialUndefinedKeys} from "../../../common/typings";
import {Lang} from "../../../localization/Lang";
import {Hook} from "../../../react/utils/Hook";
import {useDebounce} from "../../../react/utils/hooks/useDebounce";
import {mergeProps} from "../../../react/utils/mergeProps";
import {AnyRpc, RpcConnection} from "../../../typerpc/Rpc";
import {AnyDataTable} from "../../../typerpc/widget/DataTable";
import {DataTableView, DataTableViewProps} from "../../../typerpc/widget/DataTableView";
import {AnyWidgetOrConnection, WidgetType} from "../../../typerpc/widget/Widget";
import {MuiTableColumn, MuiTableColumnProps} from "../MuiTable/MuiTableColumn";
import {DefaultLang} from "./DefaultLang";
import {MuiDataTableAction, MuiDataTableActionProps} from "./MuiDataTableAction";
import {MuiTableToolbar, MuiTableToolbarProps} from "./MuiTableToolbar";
import {TableLayout} from "./TableLayout";

type MuiDataTableViewColumnProps<T = any> = {
    MuiTableColumnProps?: MuiTableColumnProps
    title?: ReactNode
    renderData?(data: T, props: {
        row: T
    }): ReactNode

};

type MuiDataTableActionEvent<C extends RpcConnection<AnyDataTable>, T, R extends AnyRpc> = {
    row: T
    key: string,
    connection: RpcConnection<R>
    table: Readonly<DataTableView<C>>;
};


;

export type DataTableRow<T extends AnyWidgetOrConnection<AnyDataTable>> =
    WidgetType<T>['Row'];

export type DataTableRowController<T extends AnyWidgetOrConnection<AnyDataTable>> =
    WidgetType<T>['RowController'];

export type MuiDataTableViewProps<C extends RpcConnection<AnyDataTable>> =
    DataTableViewProps<C> & {
    TableProps?: TableProps;
    TableHeadProps?: TableHeadProps,
    TableBodyProps?: TableBodyProps,
    TableFooterProps?: TableFooterProps,

    MuiTableToolbarProps?: Omit<MuiTableToolbarProps, "actions">

    // staticActions
    // onAddClick

    // selectActions

    // Assign<MuiDataTableActionProps, {}>
    toolbarActions?: MuiDataTableActionProps<{
        table: Readonly<DataTableView<C>>
    }>[]

    columns?: PartialUndefinedKeys<{
        [K in keyof Required<DataTableRow<C>>]:
        undefined | MuiDataTableViewColumnProps<DataTableRow<C>[K]>
    }>

    onEditClick?(event: MuiDataTableActionEvent<C, DataTableRow<C>, DataTableRowController<C>>): void;

    onDeleteClick?(event: MuiDataTableActionEvent<C, DataTableRow<C>, DataTableRowController<C>>): void;
    actions?: MuiDataTableActionProps<MuiDataTableActionEvent<C, DataTableRow<C>, DataTableRowController<C>>>[]

    title?: ReactNode;
};

export function MuiDataTableView<C extends RpcConnection<AnyDataTable>>(
    {
        TableProps,
        TableHeadProps,
        TableBodyProps,
        TableFooterProps,
        onDeleteClick,
        onEditClick,
        actions = [],
        columns,
        MuiTableToolbarProps,
        toolbarActions,
        ...props
    }: MuiDataTableViewProps<C>) {


    onEditClick && actions.push({
        title: Lang`EDIT`,
        icon: "edit",
        onClick: onEditClick
    });

    onDeleteClick && actions.push({
        title: Lang`DELETE`,
        icon: "delete",
        danger: {
            confirmText: Lang`CONFIRM_TO_DELETE?`,
            MuiConfirmDialogProps: {
                ConfirmButtonProps: {
                    kind: "delete"
                }
            }
        },
        onClick: onDeleteClick,

    })
    return <DataTableView {...props}>{table => {

        // table.props.connection.props

        return <TableLayout<[string, any], { sortable: boolean }, any>
            getRowKey={row => row[0]}
            getRowData={row => row[1]}
            rows={table.rows}
            columns={table.element?.columns || {}}
            renderColumn={(column, children) => <MuiTableColumn
                key={column.key}
                {...columns?.[column.key]?.props?.MuiTableColumnProps}>
                {children}
            </MuiTableColumn>}
            renderTitle={column => <DefaultLang default={column.key}>
                {columns?.[column.key]?.props?.title}
            </DefaultLang>}
            renderRow={(row, children) => <TableRow key={row.key}>
                {children}
                {(actions.length > 0) &&
                <MuiTableColumn fitToContent>
                    {actions.map((action, index) =>
                        <MuiDataTableAction {...action} key={index} onClick={() => {
                            action.onClick?.({
                                row: row.data,
                                key: row.key,
                                connection: table.props.connection
                                    .controller(row.key),
                                table
                            })
                        }}/>)}
                </MuiTableColumn>}
            </TableRow>}
            renderData={(data, row, column) => {
                if (columns?.[column.key]?.props?.renderData)
                    return columns?.[column.key]?.props.renderData(data, {
                        row: row.data
                    })
                return String(data);
            }}
            render={({columns, rows}) =>
                <>
                    <Hook>{() => {
                        const [searchText, setSearchText] = useState("");
                        const debounce = useDebounce();

                        return <MuiTableToolbar
                            {...mergeProps(MuiTableToolbarProps, {})}
                            search={!table.element?.searchable ? undefined : {
                                text: searchText,
                                onTextChange: async text => {
                                    setSearchText(text);
                                    if (!await debounce.wait())
                                        return;
                                    table.search(text);
                                }
                            }}
                            actions={toolbarActions?.map(action => ({
                                ...action,
                                onClick: () => {
                                    action.onClick?.({table})
                                }
                            }))}
                        />;
                    }}</Hook>
                    <Table {...TableProps}>
                        <TableHead {...TableHeadProps}>
                            <TableRow>
                                {columns}
                                {(actions.length > 0) && <MuiTableColumn fitToContent/>}
                            </TableRow>
                        </TableHead>
                        <TableBody {...TableBodyProps}>
                            {rows}
                        </TableBody>
                        <TableFooter{...TableFooterProps}>
                            <TableRow>
                                <TablePagination
                                    count={table.count}
                                    page={table.page}
                                    rowsPerPage={table.pageSize}
                                    onChangeRowsPerPage={event => {
                                        table.setPageSize(
                                            parseInt(event.target.value)
                                        )
                                    }}
                                    onChangePage={(event, page) => {
                                        table.setPage(page)
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </>
            }/>
    }}</DataTableView>

}

/*




 */

