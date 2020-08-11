import React from "react";
import {DataRow} from "../../../../data/DataRow";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";

export function renderTableBodyColumn(
    table: AnyMuiDataTable,
    item: DataRow<any>,
    column: AnyMuiDataTable['columns'][number]
) {
    // console.log({item, column});
    const data = item[column.key];

    let children;

    if (column.empty && (data == null)) {
        children = column.empty;
    } else {
        children = column.render ? column.render({item, data}) : String(data);
    }

    return <MuiTableColumn
        {...column.MuiProps}
        {...column.MuiBodyProps} key={column.key}
        onClick={() => {
            if (table.multipleActions.length)
                table.toggleSelect(item.$key);
        }}>
        {
            children
        }
    </MuiTableColumn>
}
