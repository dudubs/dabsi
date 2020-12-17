import { TableCellProps } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { createElement } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { mergeProps } from "@dabsi/react/utils/mergeProps";

const useStyles = makeStyles({
  fitToContent: {
    width: "1%",
    whiteSpace: "nowrap",
  },
});

export type MuiTableColumnProps = Override<
  TableCellProps,
  {
    fitToContent?: boolean;
  }
>;

export function MuiTableCell({ fitToContent, ...props }: MuiTableColumnProps) {
  const classes = useStyles();
  return createElement(
    TableCell,
    mergeProps(props, {
      className: classes.fitToContent,
    })
  );
}
