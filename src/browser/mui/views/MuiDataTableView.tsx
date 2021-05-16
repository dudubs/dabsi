import MuiTableCell from "@dabsi/browser/mui/components/MuiTableCell";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import {
  AnyDataTable,
  InferredDataTableRow,
} from "@dabsi/typerpc2/data-table/rpc";
import {
  DataTableView,
  DataTableViewProps,
} from "@dabsi/typerpc2/data-table/view";
import LangKey from "@dabsi/view/lang/LangKey";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import {
  Checkbox,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableFooter,
  TableHead,
  TableProps,
  TableRow,
} from "@material-ui/core";
import React from "react";

type _ColumnPropsAndState<T extends AnyDataTable> = {
  fitToContent?: boolean;

  TableCellProps?: TableCellProps;

  headTableCellProps?: TableCellProps;

  rowTableCellProps?: TableCellProps;

  title?: React.ReactNode;

  renderHead?(view: DataTableView<T>): React.ReactElement;

  renderRow?(
    data: any,
    row: InferredDataTableRow<T>,
    view: DataTableView<T>
  ): React.ReactElement;
};

export type MuiDataTableViewProps<T extends AnyDataTable> = DataTableViewProps<
  T,
  _ColumnPropsAndState<T>
> & {
  tableRef?: React.Ref<DataTableView<T, any, any>>;
  TableProps?: TableProps;
  loadingElement?: React.ReactElement;
  noHaveResultElement?: React.ReactElement;
};

export function MuiDataTableView<T extends AnyDataTable>({
  tableRef,
  TableProps,
  loadingElement,
  noHaveResultElement,
  ...DataTableViewProps
}: MuiDataTableViewProps<T>): React.ReactElement {
  return (
    <DataTableView<T, _ColumnPropsAndState<T>>
      {...DataTableViewProps}
      ref={tableRef}
    >
      {view => {
        const tableHead = (
          <TableHead>
            <TableRow>
              {view.element.selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={view.isSelectAll}
                    onChange={() => view.toggleAll()}
                  />
                </TableCell>
              )}
              {view.columns.map(column => (
                <MuiTableCell
                  {...column.TableCellProps}
                  {...column.headTableCellProps}
                  key={column.key}
                  fitToContent={column.fitToContent}
                >
                  <LangKey token={column.key}>
                    {column.renderHead ? column.renderHead(view) : column.title}
                  </LangKey>
                </MuiTableCell>
              ))}
            </TableRow>
          </TableHead>
        );
        const tableRows = view.rows.map(row => (
          <TableRow key={row.$key}>
            {view.element.selectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  checked={view.isSelectRow(row)}
                  onChange={() => view.toggleSelect(row)}
                />
              </TableCell>
            )}
            {view.columns.map(column => (
              <MuiTableCell
                {...column.TableCellProps}
                {...column.rowTableCellProps}
                key={column.key}
                fitToContent={column.fitToContent}
              >
                <LangKey token={column.key}>
                  {column.renderRow
                    ? column.renderRow(row[column.key], row, view)
                    : row[column.key]}
                </LangKey>
              </MuiTableCell>
            ))}
          </TableRow>
        ));

        const tableBody = (
          <TableBody>
            {view.isLoading && (
              <TableRow>
                <TableCell colSpan={1000}>
                  {loadingElement || <LinearProgress />}
                </TableCell>
              </TableRow>
            )}
            {tableRows.length ? (
              tableRows
            ) : (
              <TableRow>
                <TableCell colSpan={1000}>
                  {noHaveResultElement || lang`NO_HAVE_RESULT`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        );

        const tableFooter = (
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        );

        const tableElement = (
          <Table {...TableProps}>
            {tableHead}
            {tableBody}
            {tableFooter}
          </Table>
        );

        return EmptyFragment;
      }}
    </DataTableView>
  );
}
