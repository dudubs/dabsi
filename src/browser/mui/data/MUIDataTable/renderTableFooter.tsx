import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {AnyMuiDataTable} from "./index";

export function renderTableFooter(table: AnyMuiDataTable) {
    return <TableFooter>
        <TableRow>
            {!table.pageSize ? undefined : <TablePagination
                rowsPerPage={table.pageSize}
                page={table.page}
                count={table.totalCount}
                rowsPerPageOptions={[
                    table.pageSize,
                    table.pageSize * 2,
                    table.pageSize * 3,
                    table.pageSize * 4,
                ]}
                onChangeRowsPerPage={event => {
                    table.pageSize = parseInt(event.target['value']);
                    table.page = 0;
                }}
                onChangePage={(_, page) => {
                    table.page = page;
                }}
            />}
        </TableRow>
    </TableFooter>
}
