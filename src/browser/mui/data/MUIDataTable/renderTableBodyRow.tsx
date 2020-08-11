import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import {DataRow} from "../../../../data/DataRow";
import {MuiButton} from "../../components/MuiButton";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";
import {MuiDataTableAction} from "./renderTableAction";
import {renderTableBodyColumn} from "./renderTableBodyColumn";

export function renderTableBodyRow(table: AnyMuiDataTable,
                                   item: DataRow<any>) {


    const row = <TableRow key={item.$key}
                          hover={!!table.props.onPick}{
                              ...(table.multipleActions.length ||
                                  table.props.isSelected) ? {
                                  hover: true,
                                  rule: "checkbox",
                                  selected:
                                      table.props.isSelected?.(item) ??
                                      table.selectedKeys.has(item.$key)
                              } : {}
                          }>
        {table.props.renderItemCollapse && <MuiTableColumn fitToContent>
            <MuiButton
                size={"small"}
                iconOnly
                icon={require("@material-ui/icons/KeyboardArrowDown")}
            />
        </MuiTableColumn>}
        {table.isMultiSelection && <MuiTableColumn padding={"checkbox"}>
            <Checkbox checked={table.selectedKeys.has(item.$key)} onChange={() => {
                table.toggleSelect(item.$key)
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


    return row;

}
