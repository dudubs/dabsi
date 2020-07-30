import {TableSortLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";

export function renderTableHead(table: AnyMuiDataTable) {

    const selectedItems = table.getSelectedItems();
    const allSelectedItems = selectedItems.length === table.items.length;


    return <TableHead>
        <TableRow>
            {table.props.renderItemCollapse && <MuiTableColumn/>}
            {table.isMultiSelection && <MuiTableColumn padding={"checkbox"}>
                <Checkbox
                    checked={selectedItems.length === table.items.length}
                    indeterminate={!allSelectedItems && (selectedItems.length > 0)}
                    onChange={() => {
                        table.toggleSelectAll();
                    }}
                />
            </MuiTableColumn>}
            {table.columns.map((column, columnIndex) => {
                return <MuiTableColumn
                    {...column.MuiProps}
                    {...column.MuiHeadProps}
                    key={column.key}>

                    {(column.sortable !== false) ? <TableSortLabel
                            active={typeof column.sort === "string"}
                            direction={column.sort === "ASC" ? "asc" : "desc"}
                            onClick={() => table.toggleSort(columnIndex)}>
                            {column.title}
                        </TableSortLabel> :
                        column.title
                    }
                </MuiTableColumn>
            })}
            {table.singleActions.length > 0 && <MuiTableColumn fitToContent/>}
        </TableRow>
    </TableHead>
}
