import Link, { LinkProps } from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { mergeProps } from "../../../react/utils/mergeProps";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
});

export function MuiLink(props: LinkProps) {
  const classes = useStyles();
  return (
    <Link
      {...mergeProps(props, {
        className: classes.root,
      })}
    />
  );
}
