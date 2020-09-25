import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {makeStyles} from "@material-ui/styles";
import * as React from "react"; import {useState} from "react";
import {DataRow} from "../../../../data/DataRow";
import {MuiButton} from "../../components/MuiButton";
import {MuiTableColumn} from "../../MuiTable/MuiTableColumn";
import {AnyMuiDataTable} from "./index";
import {MuiDataTableAction} from "./renderTableAction";
import {renderTableBodyColumn} from "./renderTableBodyColumn";

const useStyles = makeStyles({
    collapseCell: {
        padding: 0,
        margin: 0
    }
})

export function MuiDataTableRow(
    {table, item, index}: {
        table: AnyMuiDataTable,
        item: DataRow<any>,
        index: number
    }
) {

    const classes = useStyles();
    const [isOpen, setOpen] = useState(
        table.props.expandFirstItem ?
            index === 0 : false);

    if (table.props.renderItemCollapse)
        return <>
            {renderDatas()}
            <TableRow>
                <TableCell className={classes.collapseCell} colSpan={100}>
                    <Collapse unmountOnExit in={isOpen}>
                        {table.props.renderItemCollapse(item, table)}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>

    return renderDatas()


    function renderDatas() {
        return <TableRow key={item.$key}
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
                    onClick={() => setOpen(!isOpen)}
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
        </TableRow>;
    }
}
