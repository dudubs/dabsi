import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
      },
      focus: {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        padding: theme.spacing(2) - 1,
      },
      blur: {
        "&:hover": {
          borderColor: theme.palette.grey[800],
        },
      },
    }),
  { name: "mui-focusable-box" }
);

function useBodyListener<K extends keyof HTMLElementEventMap>(
  event: K,
  callback: (event: HTMLElementEventMap[K]) => void,
  deps: any[]
) {
  useEffect(() => {
    document.body.addEventListener(event, callback);
    return () => {
      document.body.removeEventListener(event, callback);
    };
  }, deps);
}

export function MuiFocusableBox({
  children,
  onFocus,
  onBlur,
}: {
  children: React.ReactNode;
  onFocus?();
  onBlur?();
}) {
  const classes = useStyles();

  const [isFocus, setFocus] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useBodyListener(
    "focusin",
    event => {
      const isNewFocus = divRef.current?.contains(event.target as any) || false;

      if (isNewFocus !== isFocus) {
        setFocus(isNewFocus);
        isNewFocus ? onFocus?.() : onBlur?.();
      }
    },
    [isFocus]
  );

  return (
    <div
      ref={divRef}
      className={clsx(classes.root, isFocus ? classes.focus : classes.blur)}
    >
      {children}
    </div>
  );
}
