import {
  MuiButton,
  MuiButtonProps,
} from "@dabsi/browser/mui/components/MuiButton";
import { MuiDeleteButton } from "@dabsi/browser/mui/components/MuiDeleteButton";
import {
  MuiTableCell,
  MuiTableColumnProps,
} from "@dabsi/browser/mui/components/MuiTableCell";
import {
  MuiTableToolbar,
  MuiTableToolbarProps,
} from "@dabsi/browser/mui/components/MuiTableToolbar";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Lang } from "@dabsi/lang/Lang";
import { LangKey } from "@dabsi/lang/LangKey";
import { TableLayout } from "@dabsi/react/TableLayout";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyDataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import {
  DataTableView,
  DataTableViewProps,
} from "@dabsi/typerpc/widget/data-table/DataTableView";
import { WidgetType } from "@dabsi/typerpc/widget/Widget";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody, { TableBodyProps } from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter, { TableFooterProps } from "@material-ui/core/TableFooter";
import TableHead, { TableHeadProps } from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { ComponentProps, ReactElement, ReactNode, useRef } from "react";

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
    {
      title?: ReactNode;
      icon: ReactElement;
      visible?: (row: Row) => boolean;
      onClick?(event: MuiDataTableActionEvent<C>);
      IconButtonProps?: IconButtonProps;
    }
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
    title = MuiTableToolbarProps?.title,
    ...nextProps
  } = props as MuiDataTableViewProps<RpcConnection<AnyDataTable>>;

  const tableRef = useRef<DataTableView<C>>(null);

  actions = { ...actions };

  onEditClick &&
    (actions.edit = {
      title: Lang`EDIT`,
      icon: <EditIcon />,
      onClick: onEditClick,
    });

  onDeleteClick &&
    (actions.delete = {
      icon: <DeleteIcon />,
      IconButtonProps: {
        color: "secondary",
      },
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
                    ({ visible, icon, onClick, IconButtonProps }, key) => {
                      if (visible && !visible(row.data)) return;
                      return (
                        <IconButton
                          size={"small"}
                          key={key}
                          {...IconButtonProps}
                          onClick={async () => {
                            onClick?.({
                              row: row.data,
                              key: row.key,
                              table,
                            });
                          }}
                        >
                          {icon}
                        </IconButton>
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
                  staticActions={
                    <>
                      {MuiTableToolbarProps?.staticActions}
                      {mapObjectToArray(toolbarActions, (props, key) => (
                        <MuiButton
                          iconOnly
                          key={key}
                          {...props}
                          onClick={() => {
                            props.onClick?.({ table });
                          }}
                        />
                      ))}
                    </>
                  }
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
