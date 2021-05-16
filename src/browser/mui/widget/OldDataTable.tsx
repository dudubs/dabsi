// import {
//   MuiButton,
//   MuiButtonProps,
// } from "@dabsi/browser/mui/components/MuiButton";
// import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
// import {
//   MuiTableCell,
//   MuiTableCellProps,
// } from "@dabsi/browser/mui/components/MuiTableCell";
// import {
//   MuiTableToolbar,
//   MuiTableToolbarProps,
// } from "@dabsi/browser/mui/components/MuiTableToolbar";
// import { MuiSection } from "@dabsi/browser/mui/section";
// import { MuiSearchField } from "@dabsi/browser/mui/widget/searchField";
// import { hasKeys } from "@dabsi/common/object/hasKeys";
// import { mapObject } from "@dabsi/common/object/mapObject";
// import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
// import { Awaitable } from "@dabsi/common/typings2/Async";
// import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
// import { WeakId } from "@dabsi/common/WeakId";
// import LangKey from "@dabsi/view/lang/LangKey";
// import {
//   AnyDataTable,
//   DataTable,
//   DataTableType,
// } from "@dabsi/old-typerpc/data-table/rpc";
// import {
//   DataTableView,
//   DataTableViewProps,
// } from "@dabsi/old-typerpc/data-table/view";
// import { RpcConnection } from "@dabsi/old-typerpc/Rpc";
// import { ReactRef } from "@dabsi/view/react/ref";
// import { Renderer } from "@dabsi/view/react/renderer";
// import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";
// import Grid from "@material-ui/core/Grid";
// import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
// import Table, { TableProps } from "@material-ui/core/Table";
// import TableBody, { TableBodyProps } from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableFooter, { TableFooterProps } from "@material-ui/core/TableFooter";
// import TableHead, { TableHeadProps } from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
// import AddIcon from "@material-ui/icons/Add";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import React, { ReactElement, ReactNode, useRef } from "react";

// type MuiDataTableViewColumnProps<
//   C extends RpcConnection<AnyDataTable>,
//   RowColumn,
//   Row
// > = {
//   MuiTableCellProps?: MuiTableCellProps;
//   title?: ReactNode;
//   renderHeadColumn?(props: { table: DataTableView<C> }): ReactElement;
//   renderRowColumn?(props: RowCellProps<C>);
// };

// export type RowCellProps<C extends RpcConnection<AnyDataTable>> = {
//   row: DataTable.RowWithKey<DataTableType<C>>;
//   column;
//   rowIndex;
//   data;
// };

// type MuiDataTableActionEvent<C extends RpcConnection<AnyDataTable>> = {
//   row: DataTable.RowWithKey<DataTableType<C>>;
//   table: Readonly<DataTableView<C>>;
// };

// export type MuiDataTableViewProps<
//   C extends RpcConnection<AnyDataTable>,
//   Row = DataTable.RowWithKey<DataTableType<C>>
// > = DataTableViewProps<C> & {
//   TableProps?: TableProps;

//   tableRef?: React.Ref<DataTableView<any>>;

//   TableHeadProps?: TableHeadProps;

//   TableBodyProps?: TableBodyProps;

//   TableFooterProps?: TableFooterProps;

//   disableToolbar?: boolean;

//   beforeHead?: React.ReactNode;

//   afterHead?: React.ReactNode;

//   onAddNewRow?(): void;

//   addButtonTitle?: React.ReactNode;

//   columns?: PartialUndefinedKeys<
//     {
//       [K in keyof Required<Row>]:
//         | undefined
//         | MuiDataTableViewColumnProps<C, Row[K], Row>;
//     }
//   >;

//   // TODO: change to editAction: { onClick ..}
//   onEditRow?(event: MuiDataTableActionEvent<C>): void;

//   // TODO: change to deleteAction: { onClick ..}
//   onDeleteRow?(event: MuiDataTableActionEvent<C>): Awaitable;

//   actions?: Record<
//     string,
//     {
//       title?: ReactNode;
//       icon: ReactElement;
//       visible?: (row: Row) => boolean;
//       onClick?(event: MuiDataTableActionEvent<C>);
//       IconButtonProps?: IconButtonProps;
//     }
//   >;

//   title?: ReactNode;
// };

// export function MuiDataTableView<C extends RpcConnection<AnyDataTable>>(
//   p: MuiDataTableViewProps<C>
// ) {
//   let {
//     TableProps,
//     TableHeadProps,
//     TableBodyProps,
//     TableFooterProps,
//     beforeHead,
//     afterHead,
//     onDeleteRow,
//     onEditRow,
//     actions,
//     columns: columnPropsMap,
//     disableToolbar,
//     title,
//     onAddNewRow,
//     addButtonTitle,
//     ...DataTableViewProps
//   } = p;

//   const tableRef = useRef<DataTableView<C>>(null);

//   actions = { ...actions };

//   onEditRow &&
//     (actions.edit = {
//       title: lang`EDIT`,
//       icon: <EditIcon />,
//       onClick: onEditRow,
//     });

//   onDeleteRow &&
//     (actions.delete = {
//       icon: <DeleteIcon />,
//       IconButtonProps: {
//         color: "secondary",
//       },
//       onClick: async event => {
//         await onDeleteRow!(event);
//         await tableRef.current!.reloadAfterRemove(event.row.$key);
//       },
//     });

//   const addButtonElement = onAddNewRow && (
//     <Button
//       endIcon={<AddIcon />}
//       key="add"
//       onClick={() => {
//         onAddNewRow!();
//       }}
//     >
//       {addButtonTitle || lang`ADD_NEW`}
//     </Button>
//   );

//   const columns = mapObject(p.element.columns, (element, key, index) => {
//     return { element, key, props: columnPropsMap?.[key] || {}, index };
//   });

//   type Column = typeof columns[string];

//   const hasActions = hasKeys(actions);

//   return (
//     <DataTableView
//       {...DataTableViewProps}
//       ref={ReactRef.merge(p.tableRef, tableRef)}
//     >
//       {table => {
//         const renderCell = (column: Column, children) => (
//           <MuiTableCell {...column.props.MuiTableCellProps} key={column.key}>
//             {children}
//           </MuiTableCell>
//         );

//         const renderRowCell = (props: RowCellProps<any>): ReactNode => {
//           const {
//             column,
//             data,
//             column: {
//               props: { renderRowColumn },
//             },
//           } = props;

//           return renderCell(
//             column,
//             renderRowColumn ? renderRowColumn(props) : <>{String(data)}</>
//           );
//         };

//         const tableHeadCells = mapObjectToArray(columns, column => {
//           return renderCell(
//             column,
//             <>
//               {column.props.renderHeadColumn ? (
//                 column.props.renderHeadColumn({ table })
//               ) : (
//                 <LangKey token={column.key}>{column.props.title}</LangKey>
//               )}
//             </>
//           );
//         });

//         const tableRows = table.rows.map((row, rowIndex) => {
//           return (
//             <TableRow
//               key={WeakId(row)}
//               selected={table.isCheckChanged(row.$key)}
//             >
//               {table.element.checkable && (
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     checked={table.isChecked(row.$key)}
//                     onChange={() => {
//                       table.toggleCheck(row);
//                     }}
//                   />
//                 </TableCell>
//               )}
//               {mapObjectToArray(columns, column =>
//                 renderRowCell({
//                   column,
//                   row,
//                   rowIndex,
//                   data: row[column.key],
//                 })
//               )}
//               {hasActions && (
//                 <MuiTableCell fitToContent>
//                   {mapObjectToArray(
//                     actions!,
//                     ({ visible, icon, onClick, IconButtonProps }, key) => {
//                       if (visible && !visible(row.data)) return;
//                       return (
//                         <IconButton
//                           size={"small"}
//                           key={key}
//                           {...IconButtonProps}
//                           onClick={async () => {
//                             onClick?.({
//                               row: row,
//                               table,
//                             });
//                           }}
//                         >
//                           {icon}
//                         </IconButton>
//                       );
//                     }
//                   )}
//                 </MuiTableCell>
//               )}
//             </TableRow>
//           );
//         });

//         const tableHead = (
//           <TableHead {...TableHeadProps}>
//             {beforeHead}
//             <TableRow>
//               {table.element.checkable && (
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     checked={table.allChecked}
//                     onChange={() => {
//                       table.toggleAll();
//                     }}
//                   />
//                 </TableCell>
//               )}
//               {tableHeadCells}
//               {hasActions && <MuiTableCell fitToContent />}
//             </TableRow>
//             {afterHead}
//           </TableHead>
//         );

//         const tableBody = (
//           <TableBody {...TableBodyProps}>
//             {table.isLoading && (
//               <MuiTableCaption>{lang`LOADING_IN_PROGRESS`}</MuiTableCaption>
//             )}
//             {tableRows.length ? (
//               tableRows
//             ) : (
//               <MuiTableCaption>{lang`NO_HAVE_MORE_ROWS`}</MuiTableCaption>
//             )}
//           </TableBody>
//         );

//         const tableFooter = table.totalRows > table.pageSize && (
//           <TableFooter {...TableFooterProps}>
//             <TableRow>
//               <TablePagination
//                 count={table.totalRows}
//                 page={table.pageIndex}
//                 rowsPerPage={table.pageSize}
//                 onChangeRowsPerPage={event => {
//                   table.setPageSize(parseInt(event.target.value));
//                 }}
//                 onChangePage={(event, page) => {
//                   table.setPageIndex(page);
//                 }}
//               />
//             </TableRow>
//           </TableFooter>
//         );
//         const tableElement: React.ReactElement = (
//           <Table {...TableProps}>
//             {tableHead}
//             {tableBody}
//             {tableFooter}
//           </Table>
//         );

//         const searchElement = !p.element.searchable ? null : (
//           <MuiSearchField
//             onSearch={text => {
//               table.search(text);
//             }}
//           />
//         );

//         const sidebarElement = (addButtonElement || searchElement) && (
//           <Grid container>
//             {searchElement && (
//               <Grid item xs>
//                 {searchElement}
//               </Grid>
//             )}
//             {addButtonElement && <Grid item>{addButtonElement}</Grid>}
//           </Grid>
//         );

//         const sectionElement = (sidebarElement || title) && (
//           <MuiSection title={title} sidebar={sidebarElement}>
//             {tableElement}
//           </MuiSection>
//         );

//         return sectionElement || tableElement;
//       }}
//     </DataTableView>
//   );
// }

// function MuiTableCaption({ children }): React.ReactElement {
//   return (
//     <TableRow>
//       <TableCell colSpan={1000} align={"center"}>
//         {children}
//       </TableCell>
//     </TableRow>
//   );
// }
