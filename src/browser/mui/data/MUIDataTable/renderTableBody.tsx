import {LinearProgress, TableCell} from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {Lang} from "../../../../localization/Lang";
import {Hook} from "../../../../react/utils/Hook";
import {ModalStackProvider, useModalStack} from "../../../../react/ModalStack";
import {useDefinedContext} from "../../../../react/utils/hooks/useDefinedContext";
import {AnyMUIDataTable} from "./index";
import {renderTableBodyRow} from "./renderTableBodyRow";

export const NoTableItems = Lang`NO_TABLE_ITEMS`;

export function renderTableBody(table: AnyMUIDataTable) {
    return <TableBody>
        <Hook of={() => useModalStack()}>{ms =>
            !table.items.length ? <TableRow>
                <TableCell colSpan={1000}>{NoTableItems}</TableCell>
            </TableRow> : <>
                {table.items.map(item => renderTableBodyRow(table, item, ms))}
            </>
        }</Hook>
        {table.isLoading && <TableRow>
            <TableCell colSpan={1000}>
                <LinearProgress/>
            </TableCell>
        </TableRow>}
    </TableBody>
}
