import {TableSortLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {MUITableColumn} from "../../MUITable/MUITableColumn";
import {AnyMUIDataTable} from "./index";

export function renderTableHead(table: AnyMUIDataTable) {

    const selectedItems = table.items.filter(item => table.selectedKeys.has(item.key));
    const allSelectedItems = selectedItems.length === table.items.length;

    return <TableHead>
        <TableRow>
            {table.multipleActions.length > 0 && <MUITableColumn padding={"checkbox"}>
                <Checkbox
                    checked={selectedItems.length === table.items.length}
                    indeterminate={!allSelectedItems && (selectedItems.length > 0)}
                    onChange={() => {
                        if (allSelectedItems) {
                            table.selectedKeys = table.selectedKeys.clear();
                        } else {
                            const selectedKeys = table.selectedKeys.asMutable();
                            for (let {key} of table.items) {
                                selectedKeys.add(key)
                            }
                            table.selectedKeys = selectedKeys.asImmutable();
                        }
                    }}
                />
            </MUITableColumn>}
            {table.columns.map((column, columnIndex) => {
                return <MUITableColumn
                    {...column.MUIProps}
                    {...column.MUIHeadProps}
                    key={column.key}>

                    {(column.sortable !== false) ? <TableSortLabel
                            active={typeof column.sort === "string"}
                            direction={column.sort === "ASC" ? "asc" : "desc"}
                            onClick={() => table.toggleSort(columnIndex)}>
                            {column.title}
                        </TableSortLabel> :
                        column.title
                    }
                </MUITableColumn>
            })}
            {table.singleActions.length > 0 && <MUITableColumn fitToContent/>}
        </TableRow>
    </TableHead>
}
