// TODO: Fix mark row only if selection changed.
import MuiSearchField from "@dabsi/browser/mui/components/MuiSearchField";
import MuiTableCell from "@dabsi/browser/mui/components/MuiTableCell";
import MuiActions, {
  MuiAction,
  MuiActionsProps,
} from "@dabsi/browser/mui/MuiActions";
import MuiSection from "@dabsi/browser/mui/MuiSection";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  AnyDataTable,
  DataTableRow,
  InferredDataTableRow,
} from "@dabsi/typerpc/data-table/rpc";
import {
  DataTableView,
  DataTableViewProps,
} from "@dabsi/typerpc/data-table/view";
import LangKey from "@dabsi/view/lang/LangKey";
import mergeProps from "@dabsi/view/react/mergeProps";
import { ReactRef } from "@dabsi/view/react/ref";
import {
  Checkbox,
  Grid,
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
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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

export type MuiDataTableViewProps<
  T extends AnyDataTable,
  U = InferredDataTableRow<T>
> = DataTableViewProps<T, _ColumnPropsAndState<T>> & {
  tableRef?: React.Ref<DataTableView<T, any, any>>;
  TableProps?: TableProps;
  loadingElement?: React.ReactElement;
  noHaveResultElement?: React.ReactElement;

  tableWrapper?(
    children: React.ReactElement,
    view: DataTableView<T>
  ): React.ReactElement;

  sectionWrapper?(
    children: React.ReactElement,
    view: DataTableView<T>
  ): React.ReactElement;

  renderSelectColumn?(
    row: DataTableRow<U> | null, // null for head
    view: DataTableView<T>
  ): React.ReactElement;

  selectable?: boolean;

  onDeleteRows?(
    event: React.SyntheticEvent,
    rowKeys: string[],
    view: DataTableView<T>
  ): void;

  onDeleteRow?(
    event: React.SyntheticEvent,
    row: DataTableRow<U>,
    view: DataTableView<T>
  ): void;

  onEditRow?(
    event: React.SyntheticEvent,
    row: DataTableRow<U>,
    view: DataTableView<T>
  ): void;

  onAddRow?(event: React.SyntheticEvent, view: DataTableView<T>): void;

  staticActions?: Record<string | "add", MuiAction>;

  selectActions?: Record<string, MuiAction>;

  StaticActionsProps?: Partial<MuiActionsProps>;

  SelectActionsProps?: Partial<MuiActionsProps>;

  SectionActionsProps?: Partial<MuiActionsProps>;

  RowActionsProps?: Partial<MuiActionsProps>;

  actions?: {
    [K in string]: MuiDataTableAction<T, U>;
  };

  title?: React.ReactNode;
};

export type MuiDataTableAction<
  T extends AnyDataTable = AnyDataTable,
  U = any
> = Omit<MuiAction, "handle"> & {
  reload?: boolean;

  onActionForMultiple?(
    event: React.SyntheticEvent,
    rowKeys: string[],
    view: DataTableView<T>
  ): Awaitable;

  onActionForSingle?(
    event: React.SyntheticEvent,
    row: U,
    view: DataTableView<T>
  ): Awaitable;
};

export function MuiDataTableView<T extends AnyDataTable>({
  tableRef,
  TableProps,
  title,
  selectable = false,
  loadingElement,
  noHaveResultElement,
  staticActions: staticActionMap,
  selectActions: selectActionMap,
  StaticActionsProps,
  SelectActionsProps,
  SectionActionsProps = { ButtonProps: { size: "small" } },
  RowActionsProps,
  onDeleteRows,
  onDeleteRow,
  onEditRow,
  onAddRow,
  actions: _actionMap,
  renderSelectColumn,
  tableWrapper,
  sectionWrapper,
  ...DataTableViewProps
}: MuiDataTableViewProps<T>): React.ReactElement {
  staticActionMap = { ...staticActionMap };
  const viewRef = React.useRef<DataTableView<any, any>>(null);

  const actionMap = { ..._actionMap };

  const multipleActionMap: Record<string, MuiDataTableAction<any>> = {};

  const singleActionMap: Record<string, MuiDataTableAction<any>> = {};

  if (onDeleteRows || onDeleteRow) {
    actionMap.delete = mergeProps(
      {
        reload: true,
        icon: <DeleteIcon />,
        ...actionMap.delete,
      },
      {
        IconButtonProps: { $merge: { color: { $default: "secondary" } } },
        onActionForMultiple: onDeleteRows,
        onActionForSingle: onDeleteRow,
      }
    );
  }

  onEditRow &&
    (actionMap.edit = {
      icon: <EditIcon />,
      ...actionMap.edit,
      onActionForSingle: onEditRow,
    });

  onAddRow &&
    (staticActionMap.add = {
      ...staticActionMap.add,
      icon: <AddIcon />,
      onAction: event => {
        onAddRow(event, viewRef.current!);
      },
    });

  for (const [key, action] of entries(actionMap)) {
    action.onActionForMultiple && (multipleActionMap[key] = action);
    action.onActionForSingle && (singleActionMap[key] = action);
  }

  const hasActionsColumn = hasKeys(singleActionMap);

  return (
    <DataTableView<T, _ColumnPropsAndState<T>>
      {...DataTableViewProps}
      ref={ReactRef.merge(tableRef, viewRef)}
    >
      {view => {
        const hasSelectColumn = selectable || view.element.selectable;

        const executeAction = async (
          action: MuiDataTableAction<any, any>,
          execute: () => Awaitable
        ) => {
          await execute();
          if (action.reload) {
            view.loadElement();
          }
        };

        const tableHead = (
          <TableHead>
            <TableRow>
              {hasSelectColumn && (
                <TableCell padding="checkbox">
                  {renderSelectColumn ? (
                    renderSelectColumn(null, view)
                  ) : (
                    <Checkbox
                      checked={view.isSelectedAll}
                      onChange={() => view.selectAll()}
                    />
                  )}
                </TableCell>
              )}
              {view.columns.map(column => (
                <MuiTableCell
                  {...column.TableCellProps}
                  {...column.headTableCellProps}
                  key={column.key}
                  fitToContent={column.fitToContent}
                >
                  <LangKey for={column.key}>
                    {column.renderHead ? column.renderHead(view) : column.title}
                  </LangKey>
                </MuiTableCell>
              ))}
              {hasActionsColumn && <MuiTableCell />}
            </TableRow>
          </TableHead>
        );

        const tableRows = view.rows.map(row => (
          <TableRow key={row.$key} selected={view.isSelectedRow(row)}>
            {hasSelectColumn && (
              <TableCell padding="checkbox">
                {renderSelectColumn ? (
                  renderSelectColumn(row, view)
                ) : (
                  <Checkbox
                    checked={view.isSelectedRow(row)}
                    onChange={() => view.selectRow(row)}
                  />
                )}
              </TableCell>
            )}
            {view.columns.map(column => (
              <MuiTableCell
                {...column.TableCellProps}
                {...column.rowTableCellProps}
                key={column.key}
                fitToContent={column.fitToContent}
              >
                {row[column.key]}
              </MuiTableCell>
            ))}
            {hasActionsColumn && (
              <MuiTableCell>
                <MuiActions
                  ContainerProps={{ justify: "flex-end" }}
                  IconButtonProps={{ size: "small" }}
                  actions={singleActionMap}
                  onAction={(event, actionKey) => {
                    const action = singleActionMap[actionKey];
                    return executeAction(action, () =>
                      action.onActionForSingle!(event, row, view)
                    );
                  }}
                />
              </MuiTableCell>
            )}
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

        const table = (
          <Table {...TableProps}>
            {tableHead}
            {tableBody}
            {tableFooter}
          </Table>
        );

        const searchField = view.element.searchable && (
          <MuiSearchField
            onSearch={(_, text) => {
              view.searchText = text;
            }}
          />
        );

        const sectionActions =
          view.hasSelectionChanges && hasKeys(selectActionMap) ? (
            <MuiActions
              {...SectionActionsProps}
              {...SelectActionsProps}
              actions={selectActionMap!}
            />
          ) : (
            hasKeys(staticActionMap) && (
              <MuiActions
                {...SectionActionsProps}
                {...StaticActionsProps}
                actions={staticActionMap!}
              />
            )
          );

        const section = (
          <MuiSection
            title={title}
            sidebar={
              (sectionActions || searchField) && (
                <Grid container spacing={2} alignItems="center">
                  {sectionActions && <Grid item>{sectionActions}</Grid>}
                  {searchField && <Grid item>{searchField}</Grid>}
                </Grid>
              )
            }
          >
            {tableWrapper ? tableWrapper(table, view) : table}
          </MuiSection>
        );
        return sectionWrapper ? sectionWrapper(section, view) : section;
      }}
    </DataTableView>
  );
}
