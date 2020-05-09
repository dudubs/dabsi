import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {DataItem} from "../../../../data/DataItem";
import {ModalStack} from "../../../../react/ModalStack";
import {MUITableColumn} from "../../MUITable/MUITableColumn";
import {AnyMUIDataTable} from "./index";
import {renderAction} from "./renderAction";
import {renderTableBodyColumn} from "./renderTableBodyColumn";

export function renderTableBodyRow(table: AnyMUIDataTable,
                                   item: DataItem<any>,
                                   ms: ModalStack) {


    return <TableRow key={item.key} {
        ...table.multipleActions.length ? {
            hover: true,
            rule: "checkbox",
            selected: table.selectedKeys.has(item.key)
        } : {}
    }>
        {table.multipleActions.length > 0 && <MUITableColumn padding={"checkbox"}>
            <Checkbox checked={table.selectedKeys.has(item.key)} onChange={() => {
                table.toggleKey(item.key)
            }}/>
        </MUITableColumn>}
        {table.columns.map(column =>
            renderTableBodyColumn(table, item, column))}
        {table.singleActions.length > 0 && <MUITableColumn fitToContent>
            {table.singleActions.map(
                (action, index) =>
                    renderAction(table, ms, action, index,
                        () => [item.key])
            )}
        </MUITableColumn>}
    </TableRow>

}
