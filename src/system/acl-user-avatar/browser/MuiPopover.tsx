import { Override } from "@dabsi/common/typings2/Override";
import { Renderer } from "@dabsi/react/renderer";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";

import Popper, { PopperProps } from "@material-ui/core/Popper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { ReactNode, useState } from "react";
export const useStyles = makeStyles(theme =>
  createStyles({
    popperPaper: {
      padding: theme.spacing(1),
      width: 200,
    },
  })
);

export function MuiPopover({
  children,
  renderButton,
  ...props
}: Override<
  PopperProps,
  {
    open?: never;
    children: ReactNode;
    renderButton?: Renderer<{ buttonRef(el: any); onClick() }>;
  }
>) {
  const classes = useStyles();
  const [ref] = useState({ current: null as any });
  const [open, setOpen] = useState(false);
  return (
    <>
      {renderButton?.({
        buttonRef: el => {
          ref.current = el;
        },
        onClick() {
          setOpen(true);
        },
      })}

      <Popper anchorEl={() => ref.current!} {...props} open={open}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper className={classes.popperPaper}>{children}</Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
