import { TableCellProps } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { createElement } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import clsx from "clsx";

const useStyles = makeStyles({
  fitToContent: {
    width: "1%",
    whiteSpace: "nowrap",
  },
});

export type MuiTableCellProps = Override<
  TableCellProps,
  {
    fitToContent?: boolean;
  }
>;

export function MuiTableCell({ fitToContent, ...props }: MuiTableCellProps) {
  const classes = useStyles();
  return createElement(TableCell, {
    ...props,
    className: clsx({
      [classes.fitToContent]: fitToContent,
    }),
  });
}
