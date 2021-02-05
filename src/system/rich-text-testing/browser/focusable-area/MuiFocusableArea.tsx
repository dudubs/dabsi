import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import FocusableArea, {
  FocusableAreaProps,
} from "@dabsi/system/rich-text-testing/browser/focusable-area/FocusableArea";
import Paper from "@material-ui/core/Paper";
import Popper, { PopperProps } from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import React, { ReactElement, useRef, useState } from "react";

const useStyles = makeStyles(
  theme => ({
    selectionOnMove: {},
    selectionOnFocus: {},
    selection: {
      // border: "3px solid rgba(0.2,0.2,0.2,0.1)",
      // borderRadius: "5px",  backgroundColor: "rgba(0.2,0.2,0.2,0.2)",
      backgroundColor: theme.palette.grey[100],
      left: -5,
      top: -5,
      right: -5,
      bottom: -5,
    },
    toolbarPaper: {
      // padding: theme.spacing(1),
    },
  }),
  { name: "mui-focusable-area" }
);

export default function ({
  toolbar,
  toolbarPopperProps,
  divProps,
  ...props
}: FocusableAreaProps & {
  toolbar?: ReactElement;

  toolbarPopperProps?: OmitKeys<PopperProps, "open" | "anchorEl">;
}) {
  const [isFocus, setIsFocus] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  return (
    <>
      <FocusableArea
        {...props}
        classes={classes}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        divProps={mergeProps(divProps, {
          ref: divRef,
        })}
      >
        {props.children}
      </FocusableArea>
      {toolbar && (
        <Popper
          placement="top"
          {...toolbarPopperProps}
          open={isFocus}
          anchorEl={() => divRef.current!}
        >
          <FocusableArea.Disabled>
            <Paper className={classes.toolbarPaper}>{toolbar}</Paper>
          </FocusableArea.Disabled>
        </Popper>
      )}
    </>
  );
}
