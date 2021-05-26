import withStyles from "@dabsi/browser/mui/withStyles";
import { TableCellProps } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";
import React from "react";

export type MuiTableCellProps = TableCellProps & {
  fitToContent?: boolean;
};

export default withStyles({
  fitToContent: {
    width: "1%",
    whiteSpace: "nowrap",
  },
})(({ fitToContent, ...props }: MuiTableCellProps, classes) => {
  return (
    <TableCell
      {...props}
      className={clsx(props.className, fitToContent && classes.fitToContent)}
    />
  );
});
