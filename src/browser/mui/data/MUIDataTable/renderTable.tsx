import Table from "@material-ui/core/Table";
import React from "react";
import {AnyMUIDataTable} from "./index";
import {renderTableBody} from "./renderTableBody";
import {renderTableFooter} from "./renderTableFooter";
import {renderTableHead} from "./renderTableHead";
import {MUIDataTableToolbar} from "./MUIDataTableToolbar";



export function renderTable(table: AnyMUIDataTable) {
    return <>
        <MUIDataTableToolbar table={table}/>
        <Table {...table.props.TableProps}>
            {renderTableHead(table)}
            {renderTableBody(table)}
            {renderTableFooter(table)}
        </Table>
    </>
}

