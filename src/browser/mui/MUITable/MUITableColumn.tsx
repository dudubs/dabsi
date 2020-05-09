import {createStyles, TableCellProps} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import {createElement} from "react";

const useStyles = makeStyles(theme => createStyles({
    fitToContent: {
        width: '1%',
        whiteSpace:'nowrap'
    }
}));

export type MUITableColumnProps = TableCellProps & {
    fitToContent?: boolean,
};


export function MUITableColumn({fitToContent, ...props}: MUITableColumnProps) {
    const classes = useStyles();


    return createElement(TableCell, {
        ...props,
        className: clsx(props.className, {
            [classes.fitToContent]: fitToContent
        })
    })
}
