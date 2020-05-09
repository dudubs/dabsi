import React from "react";
import {DataItem} from "../../../../data/DataItem";
import {Layout} from "../../../../react/utils/Layout";
import {MUITableColumn} from "../../MUITable/MUITableColumn";
import {AnyMUIDataTable} from "./index";

export function renderTableBodyColumn(
    table: AnyMUIDataTable,
    item: DataItem<any>,
    column: AnyMUIDataTable['columns'][number]
) {
    const data = item.row[column.key];

    // const hasActions = table.props.r

    const children = (column.empty && (data == null)) ? column.empty :
        column.layout ? Layout(column.layout, {
                ...item,
                data
            }) :
            String(data);
    return <MUITableColumn {...column.MUIProps} {...column.MUIBodyProps} key={column.key}
                           onClick={() => table.toggleKey(item.key)}>
        {
            column.render ? column.render(children) :
                children
        }
    </MUITableColumn>
}
