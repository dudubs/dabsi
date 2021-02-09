import withStyles from "@dabsi/system/rich-text/browser/toolbars/withStyles";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import clsx from "clsx";

import React from "react";

export type MuiToolbarButtonProps = IconButtonProps & {
  selected?: boolean;
  icon?: React.ReactElement;
};
export const MuiToolbarButton = withStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
  },
}))<MuiToolbarButtonProps>(
  ({ selected, children, icon, ...props }, classes) => (
    <IconButton
      size="small"
      {...props}
      className={clsx(props.className, selected && classes.selected)}
    >
      {icon || children}
    </IconButton>
  )
);
