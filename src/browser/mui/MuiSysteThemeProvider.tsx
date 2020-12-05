import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { mapObject } from "../../common/object/mapObject";
import { MuiTheme, MuiThemeProvider } from "./MuiSystem";

const useStyles = makeStyles(
  {
    MuiTextField: {},
    MuiButton: {
      textTransform: "none",
      // color: "red",
    },
    MuiOutlinedInput: {
      // background: "red",
      fontSize: "13px",
      "&-label": {
        fontSize: "13px",
      },
    },
    MuiInputLabel: {
      fontSize: "13px",
    },
  },
  {
    name: "System",
  }
);

// xs sm md lg xl
export function MuiSystemProvider<Styles>({
  children,
}: {
  children?: ReactNode;
}) {
  const classes = useStyles();

  return (
    <MuiThemeProvider
      theme={(theme: MuiTheme) => ({
        ...theme,
        props: {
          ...theme.props,
          ...mapObject(classes, (className, key) => ({
            ...theme.props?.[key],
            className: clsx(theme.props?.[key]?.className, className),
          })),
        },
      })}
    >
      {children}
    </MuiThemeProvider>
  );
}
