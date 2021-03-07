import AddIcon from "@material-ui/icons/Add";
import {
  MuiButton,
  MuiButtonProps,
} from "@dabsi/browser/mui/components/MuiButton";
import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
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
import LangKey from "@dabsi/lang/LangKey";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyDataTable } from "@dabsi/typerpc/widget/data-table/rpc";
import {
  DataTableView,
  DataTableViewProps,
} from "@dabsi/typerpc/widget/data-table/view";
import { WidgetType } from "@dabsi/typerpc/widget/Widget";
import { ReactRef } from "@dabsi/view/react/ref";
import { Renderer } from "@dabsi/view/react/renderer";
import Button from "@material-ui/core/Button";
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
import React, { ReactElement, ReactNode, useRef } from "react";

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

  beforeHead?: React.ReactElement;
  afterHead?: React.ReactElement;

  addAction?: {
    title: React.ReactElement;
    onClick: (event: React.SyntheticEvent<any>) => void;
  };

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

  // TODO: change to editAction: { onClick ..}
  onEditClick?(event: MuiDataTableActionEvent<C>): void;

  // TODO: change to deleteAction: { onClick ..}
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
};

export function MuiDataTableView<C extends RpcConnection<AnyDataTable>>(
  props: MuiDataTableViewProps<C>
) {
  let {
    TableProps,
    TableHeadProps,
    TableBodyProps,
    TableFooterProps,
    beforeHead,
    afterHead,
    onDeleteClick,
    onEditClick,
    actions,
    columns: columnPropsMap,
    MuiTableToolbarProps,
    toolbarActions = {},
    addAction,
    disableToolbar,
    renderRow: rowRenderer = ({ children, key }) => (
      <TableRow key={key}>{children}</TableRow>
    ),
    title = MuiTableToolbarProps?.title,
    ...nextProps
  } = props as MuiDataTableViewProps<RpcConnection<AnyDataTable>>;

  const tableRef = useRef<DataTableView<C>>(null);

  actions = { ...actions };
  const staticActions: React.ReactElement[] = [];

  onEditClick &&
    (actions.edit = {
      title: lang`EDIT`,
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

  if (addAction) {
    staticActions.push(
      <Button endIcon={<AddIcon />} key="add" onClick={addAction.onClick}>
        {addAction.title}
      </Button>
    );
  }

  const columns = mapObject(props.element.columns, (element, key, index) => {
    return { element, key, props: columnPropsMap?.[key] || {}, index };
  });

  type Column = typeof columns[string];

  const hasActions = hasKeys(actions);

  return (
    <DataTableView
      {...nextProps}
      ref={ReactRef.merge(props.tableRef, tableRef)}
    >
      {table => {
        const head = (
          <TableHead {...TableHeadProps}>
            {beforeHead}
            {!table.isLoading && (
              <TableRow>
                {mapObjectToArray(columns, renderHeadCell)}
                {hasActions && <MuiTableCell fitToContent />}
              </TableRow>
            )}
            {afterHead}
          </TableHead>
        );

        const progress = table.isLoading && (
          <TableRow>
            <TableCell colSpan={1000} align={"center"}>
              {lang`LOADING_IN_PROGRESS`}
            </TableCell>
          </TableRow>
        );

        const rows = (
          <TableBody {...TableBodyProps}>
            {progress}
            {table.rows.length ? table.rows.map(renderRow) : renderNoRows()}
          </TableBody>
        );

        const footer = (
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

        const toolbar = !disableToolbar && (
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
                {staticActions}
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
        );
        return (
          <MuiGrid direction="column">
            <div>{toolbar}</div>
            <div>
              <Table {...TableProps}>
                {head}
                {rows}
                {footer}
              </Table>
            </div>
          </MuiGrid>
        );

        function renderHeadCell(column: Column): ReactNode {
          return renderColumn(
            column,
            <>
              {column.props.renderHeadColumn ? (
                column.props.renderHeadColumn({ table })
              ) : (
                <LangKey token={column.key}>{column.props.title}</LangKey>
              )}
            </>
          );
        }

        function renderRow(row, rowIndex) {
          const rowActions = hasActions && (
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
                  {rowActions}
                </>
              ),
            },
            TableRow
          );
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

        function renderNoRows() {
          return (
            <TableRow>
              <TableCell colSpan={1000} align={"center"}>
                {lang`NO_HAVE_MORE_ROWS`}
              </TableCell>
            </TableRow>
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
