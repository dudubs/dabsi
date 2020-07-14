import {TableCellProps} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import {createElement} from "react";

const useStyles = makeStyles({
    fitToContent: {
        width: '1%',
        whiteSpace: 'nowrap'
    }
});

export type MuiTableColumnProps = TableCellProps & {
    fitToContent?: boolean,
};


export function MuiTableColumn({fitToContent, ...props}: MuiTableColumnProps) {
    const classes = useStyles();


    return createElement(TableCell, {
        ...props,
        className: clsx(props.className, {
            [classes.fitToContent]: fitToContent
        })
    })
}
