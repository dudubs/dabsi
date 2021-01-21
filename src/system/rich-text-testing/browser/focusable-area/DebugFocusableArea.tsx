import FocusableArea, {
  FocusableAreaProps,
} from "@dabsi/system/rich-text-testing/browser/focusable-area/FocusableArea";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    border: "2px solid transparent",
    cursor: "default",
  },
  inline: {
    display: "inline-block",
  },
  move: {
    borderColor: "black",
  },
  focus: {
    borderColor: "gray",
  },
  blur: {},
});

export default function (props: FocusableAreaProps) {
  return <FocusableArea {...props} classes={useStyles()} />;
}
