import Table, { TableProps } from "@material-ui/core/Table";
import TableBody, { TableBodyProps } from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter, { TableFooterProps } from "@material-ui/core/TableFooter";
import TableHead, { TableHeadProps } from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { ComponentProps, ReactNode, useRef } from "react";
import { hasKeys } from "../../../common/object/hasKeys";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Awaitable } from "../../../common/typings2/Async";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Lang } from "../../../lang/Lang";
import { LangKey } from "../../../lang/LangKey";
import { TableLayout } from "../../../react/TableLayout";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyDataTable } from "../../../typerpc/widget/data-table/DataTable";
import {
  DataTableView,
  DataTableViewProps,
} from "../../../typerpc/widget/data-table/DataTableView";

import { WidgetType } from "../../../typerpc/widget/Widget";
import { MuiButton, MuiButtonProps } from "../components/MuiButton";
import { MuiDeleteButton } from "../components/MuiDeleteButton";
import { MuiTableCell, MuiTableColumnProps } from "../components/MuiTableCell";
import {
  MuiTableToolbar,
  MuiTableToolbarProps,
} from "../components/MuiTableToolbar";

type MuiDataTableViewColumnProps<
  C extends RpcConnection<AnyDataTable>,
  RowColumn,
  Row
> = {
  MuiTableColumnProps?: MuiTableColumnProps;
  title?: ReactNode;
  renderRowColumn?(
    data: RowColumn,
    props: {
      key: string;
      row: WidgetType<C>["Types"]["RowWithKey"];
    }
  ): ReactNode;
};

type MuiDataTableActionEvent<C extends RpcConnection<AnyDataTable>> = {
  row: WidgetType<C>["Types"]["RowWithKey"];
  key: string;
  connection: RpcConnection<WidgetType<C>["Types"]["RowController"]>;
  table: Readonly<DataTableView<C>>;
};

export type MuiDataTableViewProps<
  C extends RpcConnection<AnyDataTable>,
  Row = WidgetType<C>["Types"]["Row"]
> = DataTableViewProps<C> & {
  TableProps?: TableProps;
  TableHeadProps?: TableHeadProps;
  TableBodyProps?: TableBodyProps;
  TableFooterProps?: TableFooterProps;

  disableToolbar?: boolean;

  MuiTableToolbarProps?: Omit<MuiTableToolbarProps, "actions">;

  // TODO: onAddClick

  // TODO: selectActions

  // Assign<MuiDataTableActionProps, {}>
  toolbarActions?: Record<
    string,
    MuiButtonProps<{
      onClick(props: { table: Readonly<DataTableView<C>> });
    }>
  >;

  columns?: PartialUndefinedKeys<
    {
      [K in keyof Required<Row>]:
        | undefined
        | MuiDataTableViewColumnProps<C, Row[K], Row>;
    }
  >;

  onEditClick?(event: MuiDataTableActionEvent<C>): void;

  onDeleteClick?(event: MuiDataTableActionEvent<C>): Awaitable;

  actions?: Record<
    string,
    MuiButtonProps<{
      visible?: (row: Row) => boolean;
      onClick?(event: MuiDataTableActionEvent<C>);
    }>
  >;

  title?: ReactNode;

  MuiDeleteButtonProps?: Partial<ComponentProps<typeof MuiDeleteButton>>;
};

export function MuiDataTableView<C extends RpcConnection<AnyDataTable>>(
  props: MuiDataTableViewProps<C>
) {
  let {
    TableProps,
    TableHeadProps,
    TableBodyProps,
    TableFooterProps,
    onDeleteClick,
    onEditClick,
    actions,
    columns,
    MuiTableToolbarProps,
    MuiDeleteButtonProps,
    toolbarActions = {},
    disableToolbar,
    title,
    ...nextProps
  } = props as MuiDataTableViewProps<RpcConnection<AnyDataTable>>;

  const tableRef = useRef<DataTableView<C>>(null);

  actions = { ...actions };

  onEditClick &&
    (actions.add = {
      title: Lang`EDIT`,
      icon: require("@material-ui/icons/Edit"),
      onClick: onEditClick,
    });

  onDeleteClick &&
    (actions.delete = {
      buttonType: MuiDeleteButton,
      onClick: async event => {
        await onDeleteClick!(event);
        await tableRef.current!.reloadAfterRemove(event.key);
      },
    });

  return (
    <DataTableView {...nextProps} ref={tableRef}>
      {table => (
        <TableLayout<{ $key: string }, { sortable: boolean }, any>
          getRowKey={row => row.$key}
          getRowData={row => row}
          rows={table.rows}
          columns={table.element?.columns || {}}
          renderColumnTitle={column => (
            <LangKey for={column.key}>{columns?.[column.key]?.title}</LangKey>
          )}
          renderColumn={(column, children) => (
            <TableCell
              key={column.key}
              {...columns?.[column.key]?.MuiTableColumnProps}
            >
              {children}
            </TableCell>
          )}
          renderRow={(row, children) => (
            <TableRow key={row.key}>
              {children}
              {hasKeys(actions) && (
                <MuiTableCell fitToContent>
                  {mapObjectToArray(
                    actions!,
                    ({ visible, onClick, ...MuiButtonProps }, key) => {
                      if (visible && !visible(row.data)) return;
                      return (
                        <MuiButton
                          iconOnly
                          size={"small"}
                          key={key}
                          {...MuiButtonProps}
                          onClick={async () => {
                            onClick?.({
                              row: row.data,
                              key: row.key,
                              connection: table.props.connection.controller.getRowController(
                                row.key
                              ),
                              table,
                            });
                          }}
                        />
                      );
                    }
                  )}
                </MuiTableCell>
              )}
            </TableRow>
          )}
          renderRowColumn={(data, row, column) => {
            const { renderRowColumn } = columns?.[column.key] || {};

            if (renderRowColumn)
              return renderRowColumn(data, {
                key: row.key,
                row: row.data,
              });
            return String(data);
          }}
          render={({ columns, rows }) => (
            <>
              {!disableToolbar && (
                <MuiTableToolbar
                  title={title}
                  {...MuiTableToolbarProps}
                  search={
                    !table.element?.searchable
                      ? undefined
                      : {
                          text: table.searchText,
                          onSearch: async text => {
                            table.search(text);
                          },
                        }
                  }
                  staticActions={mapObjectToArray(
                    toolbarActions,
                    (props, key) => (
                      <MuiButton
                        iconOnly
                        key={key}
                        {...props}
                        onClick={() => {
                          props.onClick?.({ table });
                        }}
                      />
                    )
                  )}
                />
              )}
              <Table {...TableProps}>
                <TableHead {...TableHeadProps}>
                  {!table.isLoading && (
                    <TableRow>
                      {columns}
                      {hasKeys(actions) && <MuiTableCell fitToContent />}
                    </TableRow>
                  )}
                </TableHead>
                <TableBody {...TableBodyProps}>
                  {table.isLoading && (
                    <TableRow>
                      <TableCell colSpan={1000} align={"center"}>
                        {Lang`LOADING_IN_PROGRESS`}
                      </TableCell>
                    </TableRow>
                  )}

                  {rows.length ? (
                    rows
                  ) : (
                    <TableRow>
                      <TableCell colSpan={1000} align={"center"}>
                        {Lang`NO_HAVE_MORE_ROWS`}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter {...TableFooterProps}>
                  <TableRow>
                    <TablePagination
                      count={table.pageSize}
                      page={table.pageIndex}
                      rowsPerPage={table.pageSize}
                      onChangeRowsPerPage={event => {
                        table.setPageSize(parseInt(event.target.value));
                      }}
                      onChangePage={(event, page) => {
                        table.setPageIndex(page);
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </>
          )}
        />
      )}
    </DataTableView>
  );
}
