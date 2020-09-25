import Table, {TableProps} from "@material-ui/core/Table";
import TableBody, {TableBodyProps} from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter, {TableFooterProps} from "@material-ui/core/TableFooter";
import TableHead, {TableHeadProps} from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react"; import {ReactNode} from "react";
import {PartialUndefinedKeys} from "../../../common/typings";
import {Lang} from "../../../localization/Lang";
import {AnyRpc, RpcConnection} from "../../../typerpc/Rpc";
import {AnyDataTable, DataTableRow} from "../../../typerpc/widget/DataTable";
import {DataTableView, DataTableViewProps} from "../../../typerpc/widget/DataTableView";
import {WidgetType} from "../../../typerpc/widget/Widget";
import {MuiTableColumn, MuiTableColumnProps} from "../MuiTable/MuiTableColumn";
import {LangKey} from "./LangKey";
import {MuiDataTableAction, MuiDataTableActionProps} from "./MuiDataTableAction";
import {MuiTableToolbar, MuiTableToolbarProps} from "./MuiTableToolbar";
import {TableLayout} from "./TableLayout";

type MuiDataTableViewColumnProps<C extends RpcConnection<AnyDataTable>, RowColumn> = {
    MuiTableColumnProps?: MuiTableColumnProps
    title?: ReactNode
    renderRowColumn?(data: RowColumn, props: {
        key: string,
        row: DataTableRow<C>
    }): ReactNode

};

type MuiDataTableActionEvent<C extends RpcConnection<AnyDataTable>, R extends AnyRpc> = {
    row: DataTableRow<C>
    key: string,
    connection: RpcConnection<R>
    table: Readonly<DataTableView<C>>;
};


export type MuiDataTableViewProps<C extends RpcConnection<AnyDataTable>,
    Row =
        WidgetType<C>['Row'],
    RowController extends AnyRpc =
        WidgetType<C>['RowController']> =
    DataTableViewProps<C> & {
    TableProps?: TableProps;
    TableHeadProps?: TableHeadProps,
    TableBodyProps?: TableBodyProps,
    TableFooterProps?: TableFooterProps,

    disableToolbar?: boolean;

    MuiTableToolbarProps?: Omit<MuiTableToolbarProps, "actions">

    // staticActions
    // onAddClick

    // selectActions

    // Assign<MuiDataTableActionProps, {}>
    toolbarActions?: MuiDataTableActionProps<{
        table: Readonly<DataTableView<C>>
    }>[]

    columns?: PartialUndefinedKeys<{
        [K in keyof Required<Row>]:
        undefined | MuiDataTableViewColumnProps<C,Row[K]>
    }>

    onEditClick?(event: MuiDataTableActionEvent<C,
        RowController>): void;

    onDeleteClick?(event: MuiDataTableActionEvent<C, RowController>): void;
    actions?: MuiDataTableActionProps<MuiDataTableActionEvent<C, RowController>>[]

    title?: ReactNode;
};

export function MuiDataTableView<C extends RpcConnection<AnyDataTable>>(props: MuiDataTableViewProps<C>) {

    const {
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
        disableToolbar,
        title,
        ...nextProps
    } = props as MuiDataTableViewProps<RpcConnection<AnyDataTable>>;

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
    return <DataTableView {...nextProps}>{table => {

        return <TableLayout<{ $key: string }, { sortable: boolean }, any>
            getRowKey={row => row.$key}
            getRowData={row => row}
            rows={table.rows}
            columns={table.element?.columns || {}}

            renderTitle={column =>
                <LangKey for={column.key}>{columns?.[column.key]?.title}</LangKey>
            }

            renderColumn={(column, children) =>
                <TableCell
                    key={column.key}
                    {...columns?.[column.key]?.MuiTableColumnProps}>
                    {children}
                </TableCell>
            }


            renderRow={(row, children) =>
                <TableRow key={row.key}>
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
                </TableRow>
            }

            renderRowColumn={(data, row, column) => {
                const {renderRowColumn} = columns?.[column.key] || {};

                if (renderRowColumn)
                    return renderRowColumn(data, {
                        key: row.key,
                        row: row.data
                    })
                return String(data);
            }}

            render={({columns, rows}) =>
                <>
                    {!disableToolbar && <MuiTableToolbar
                        title={title}
                        {...MuiTableToolbarProps}
                        search={!table.element?.searchable ? undefined : {
                            text: table.searchText,
                            onSearch: async text => {
                                table.search(text);
                            }
                        }}
                        actions={toolbarActions?.map(action => ({
                            ...action,
                            onClick: () => {
                                action.onClick?.({table})
                            }
                        }))}
                    />}
                    <Table {...TableProps}>
                        <TableHead {...TableHeadProps}>
                            {!table.isLoading && <TableRow>
                                {columns}
                                {actions.length > 0 && <MuiTableColumn fitToContent/>}
                            </TableRow>}
                        </TableHead>
                        <TableBody {...TableBodyProps}>
                            {table.isLoading && <TableRow>
                                <TableCell colSpan={1000} align={"center"}>
                                    {Lang`LOADING_IN_PROGRESS`}
                                </TableCell>
                            </TableRow>}

                            {rows.length ? rows : <TableRow>
                                <TableCell colSpan={1000} align={"center"}>
                                    {Lang`NO_HAVE_MORE_ROWS`}
                                </TableCell>
                            </TableRow>
                            }
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

