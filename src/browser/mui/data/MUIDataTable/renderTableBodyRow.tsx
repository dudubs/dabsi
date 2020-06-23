import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {DataItem} from "../../../../data/DataItem";
import {ModalStack} from "../../../../react/ModalStack";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";
import {MuiDataTableAction, renderTableAction} from "./renderTableAction";
import {renderTableBodyColumn} from "./renderTableBodyColumn";

export function renderTableBodyRow(table: AnyMuiDataTable,
                                   item: DataItem<any>,
                                   ms: ModalStack) {


    return <TableRow key={item.key}
                     hover={!!table.props.onPick}{
                         ...(table.multipleActions.length ||
                             table.props.isSelected) ? {
                             hover: true,
                             rule: "checkbox",
                             selected:
                                 table.props.isSelected?.(item) ??
                                 table.selectedKeys.has(item.key)
                         } : {}
                     }>
        {table.isMultiSelection && <MuiTableColumn padding={"checkbox"}>
            <Checkbox checked={table.selectedKeys.has(item.key)} onChange={() => {
                table.toggleSelect(item.key)
            }}/>
        </MuiTableColumn>}
        {table.columns.map(column =>
            renderTableBodyColumn(table, item, column))}

        {table.singleActions.length > 0 && <MuiTableColumn fitToContent>
            {table.singleActions.map(
                (action, index) =>
                    <MuiDataTableAction
                        item={item}
                        table={table}
                        action={action}
                        index={index}
                        key={index}/>
            )}
        </MuiTableColumn>}
    </TableRow>

}
