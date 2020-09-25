import { LinearProgress, TableCell } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Lang } from "../../../../localization/Lang";
import { AnyMuiDataTable } from "./index";
import { MuiDataTableRow } from "./MuiDataTableRow";

export const NoTableItems = Lang`NO_TABLE_ITEMS`;

export function renderTableBody(table: AnyMuiDataTable) {
  return (
    <TableBody>
      {!table.items.length ? (
        <TableRow>
          <TableCell colSpan={1000}>{NoTableItems}</TableCell>
        </TableRow>
      ) : (
        <>
          {table.items.map((item, index) => (
            <MuiDataTableRow
              key={item.$key}
              table={table}
              item={item}
              index={index}
            />
          ))}
        </>
      )}
      {table.isLoading && (
        <TableRow>
          <TableCell colSpan={1000}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
