import { DefaultTheme, makeStyles } from "@material-ui/core/styles";
import { Styles } from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import React from "react";

export default ((styles, options?) => {
  const useStyles = makeStyles(styles, options);
  return renderer => {
    return props => {
      const classes = useStyles();
      if (classes["root"]) {
        props = { ...props, className: clsx(props.className, classes["root"]) };
      }
      if (typeof renderer === "string")
        return React.createElement(renderer, props);
      return renderer(props, classes);
    };
  };
}) as {
  <K extends string>(styles: Styles<DefaultTheme, {}, K>, options?): {
    <P extends object = {}>(
      renderer: (props: P, classes: Record<K, string>) => React.ReactElement
    ): {
      (props: P): React.ReactElement;
    };
    <T extends keyof JSX.IntrinsicElements>(type: T): {
      (props: React.ComponentProps<T>): React.ReactElement;
    };
  };
};
