import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {AnyMUIDataTable} from "./index";

export function renderTableFooter(table: AnyMUIDataTable) {
    return <TableFooter>
        <TableRow>
            {table.pageSize > 0 && <TablePagination
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
