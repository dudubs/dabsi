import withStyles from "@dabsi/system/rich-text/browser/text-toolbar/withStyles";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import clsx from "clsx";

import React from "react";

export default withStyles(theme => ({
  selected: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
  },
}))<IconButtonProps & { selected?: boolean }>(
  ({ selected, ...props }, classes) => (
    <IconButton
      size="small"
      {...props}
      className={clsx(props.className, selected && classes.selected)}
    />
  )
);
