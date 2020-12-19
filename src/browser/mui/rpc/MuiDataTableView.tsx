import {
  MuiButton,
  MuiButtonProps,
} from "@dabsi/browser/mui/components/MuiButton";
import { MuiDeleteButton } from "@dabsi/browser/mui/components/MuiDeleteButton";
import { MuiGrid } from "@dabsi/browser/mui/components/MuiGrid";
import {
  MuiTableCell,
  MuiTableCellProps,
} from "@dabsi/browser/mui/components/MuiTableCell";
import {
  MuiTableToolbar,
  MuiTableToolbarProps,
} from "@dabsi/browser/mui/components/MuiTableToolbar";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Lang } from "@dabsi/lang/Lang";
import { LangKey } from "@dabsi/lang/LangKey";
import { Renderer } from "@dabsi/react/renderer";
import { mergeRefs } from "@dabsi/react/utils/mergeRefs";
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
  MuiTableCellProps?: MuiTableCellProps;
  title?: ReactNode;
  renderHeadColumn?(props: { table: DataTableView<C> }): ReactElement;
  renderRowColumn?(props: RowCellProps<C>);
};

export type RowCellProps<C extends RpcConnection<AnyDataTable>> = {
  row: WidgetType<C>["Types"]["RowWithKey"];
  column;
  rowIndex;
  data;
};

type MuiDataTableActionEvent<C extends RpcConnection<AnyDataTable>> = {
  row: WidgetType<C>["Types"]["RowWithKey"];
  table: Readonly<DataTableView<C>>;
};

export type MuiDataTableViewProps<
  C extends RpcConnection<AnyDataTable>,
  Row = WidgetType<C>["TDataTable"]["Row"]
> = DataTableViewProps<C> & {
  TableProps?: TableProps;

  tableRef?: React.Ref<DataTableView<C>>;

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

  renderRow?: Renderer<
    { row; rowIndex; children: ReactElement },
    [component: typeof TableRow]
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
    columns: columnPropsMap,
    MuiTableToolbarProps,
    MuiDeleteButtonProps,
    toolbarActions = {},
    disableToolbar,
    renderRow: rowRenderer = ({ children, key }) => (
      <TableRow key={key}>{children}</TableRow>
    ),
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
        await tableRef.current!.reloadAfterRemove(event.row.$key);
      },
    });

  const columns = mapObject(props.element.columns, (element, key, index) => {
    return { element, key, props: columnPropsMap?.[key] || {}, index };
  });

  type Column = typeof columns[string];
  type RowCell = { column: Column; row; rowIndex: number; data };

  const hasActions = hasKeys(actions);
  return (
    <DataTableView {...nextProps} ref={mergeRefs(props.tableRef, tableRef)}>
      {table => {
        return (
          <MuiGrid direction="column">
            <div>{renderToolbar()}</div>
            <div>
              <Table {...TableProps}>
                {renderHead()}
                {renderBody()}
                {renderFooter()}
              </Table>
            </div>
          </MuiGrid>
        );

        function renderToolbar() {
          return (
            !disableToolbar && (
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
            )
          );
        }

        function renderHead() {
          return (
            <TableHead {...TableHeadProps}>
              {!table.isLoading && (
                <TableRow>
                  {mapObjectToArray(columns, renderHeadCell)}
                  {hasActions && <MuiTableCell fitToContent />}
                </TableRow>
              )}
            </TableHead>
          );
        }

        function renderHeadCell(column: Column): ReactNode {
          return renderColumn(
            column,
            <>
              {column.props.renderHeadColumn ? (
                column.props.renderHeadColumn({ table })
              ) : (
                <LangKey for={column.key}>{column.props.title}</LangKey>
              )}
            </>
          );
        }

        function renderBody() {
          return (
            <TableBody {...TableBodyProps}>
              {renderLoadingRow()}
              {table.rows.length ? table.rows.map(renderRow) : renderNoRows()}
            </TableBody>
          );

          function renderRow(row, rowIndex) {
            return rowRenderer(
              {
                key: row.$key,
                rowIndex,
                row,
                children: (
                  <>
                    {mapObjectToArray(columns, column =>
                      renderRowCell({
                        column,
                        row,
                        rowIndex,
                        data: row[column.key],
                      })
                    )}
                    {hasActions && renderActions()}
                  </>
                ),
              },
              TableRow
            );

            function renderActions() {
              return (
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
                              row: row,
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
              );
            }
          }

          function renderRowCell(props: RowCellProps<any>): ReactNode {
            const {
              column,
              data,
              column: {
                props: { renderRowColumn },
              },
            } = props;

            return renderColumn(
              column,
              renderRowColumn ? renderRowColumn(props) : <>{String(data)}</>
            );
          }
        }

        function renderLoadingRow() {
          return (
            table.isLoading && (
              <TableRow>
                <TableCell colSpan={1000} align={"center"}>
                  {Lang`LOADING_IN_PROGRESS`}
                </TableCell>
              </TableRow>
            )
          );
        }

        function renderNoRows() {
          return (
            <TableRow>
              <TableCell colSpan={1000} align={"center"}>
                {Lang`NO_HAVE_MORE_ROWS`}
              </TableCell>
            </TableRow>
          );
        }

        function renderFooter() {
          return (
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
          );
        }

        function renderColumn(column: Column, children) {
          return (
            <MuiTableCell {...column.props.MuiTableCellProps} key={column.key}>
              {children}
            </MuiTableCell>
          );
        }
      }}
    </DataTableView>
  );
}
