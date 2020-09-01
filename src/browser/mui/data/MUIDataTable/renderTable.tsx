import Table from "@material-ui/core/Table";
import React from "react";
import {AnyMuiDataTable} from "./index";
import {renderTableBody} from "./renderTableBody";
import {renderTableFooter} from "./renderTableFooter";
import {renderTableHead} from "./renderTableHead";
import {MuiDataTableToolbar} from "./MuiDataTableToolbar";



export function renderTable(table: AnyMuiDataTable) {
    return <>
        <MuiDataTableToolbar table={table}/>
        <Table {...table.props.TableProps}>
            {renderTableHead(table)}
            {renderTableBody(table)}
            {renderTableFooter(table)}
        </Table>
    </>
}



