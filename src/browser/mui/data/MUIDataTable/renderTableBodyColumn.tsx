import React from "react";
import {DataItem} from "../../../../data/DataItem";
import {LayoutOld} from "../../../../react/utils/LayoutOld";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";

export function renderTableBodyColumn(
    table: AnyMuiDataTable,
    item: DataItem<any>,
    column: AnyMuiDataTable['columns'][number]
) {
    // console.log({item, column});
    const data = item.row[column.key];

    let children;

    if(column.empty &&(data==null)) {
        children = column.empty;
    } else {
        children= column.render ? column.render({item, data}) : String(data);
    }

    return <MuiTableColumn
        {...column.MuiProps}
        {...column.MuiBodyProps} key={column.key}
        onClick={() => {
            if (table.multipleActions.length)
                table.toggleSelect(item.key);
        }}>
        {
            children
        }
    </MuiTableColumn>
}
