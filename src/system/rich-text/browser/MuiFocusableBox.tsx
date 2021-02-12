import { Emittable } from "@dabsi/react/reactor/Reactor";
import { useEmitted } from "@dabsi/react/reactor/useEmitted";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { makeFoucsableBorder } from "@dabsi/system/rich-text/browser/makeFoucsableBorder";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        postion: "relative",
      },
      focused: {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        padding: theme.spacing(2) - 1,
      },
      blured: {
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

const cachedEvents = new WeakSet<any>();
const focusOn = Emittable<{ focusId: number }>();

let counter = 0;
export function MuiFocusableBox({
  children,
  onFocus,
  onBlur,
  customClass,
  id,
  forceFocus,
}: {
  children: React.ReactNode;
  onFocus?();
  onBlur?();
  customClass?(state: "blured" | "focused"): string;
  id?: string;
  forceFocus?: boolean;
}) {
  const classes = useStyles();
  const emitter = useEmitter();
  const [hasFocus, setFocus] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const focusId = useMemo(() => ++counter, []);

  const updateFocus = nextFocus => {
    if (nextFocus && !hasFocus) {
      onFocus?.();
    } else if (!nextFocus && hasFocus) {
      onBlur?.();
    } else {
      return;
    }
    setFocus(nextFocus);
  };

  useEmitted(focusOn, event => {
    if (event?.focusId === focusId) {
      setFocus(true);
    }
  });
  useEffect(() => {
    forceFocus && emitter(focusOn, { focusId });
  }, [forceFocus]);

  useBodyListener(
    "mousedown",
    event => {
      const isChild = divRef.current?.contains(event.target as any) || false;

      !isChild && updateFocus(false);
    },
    [hasFocus]
  );

  return (
    <div
      id={id}
      ref={divRef}
      onMouseDown={event => {
        if (!cachedEvents.touch(event)) {
          updateFocus(false);
          return;
        }
        updateFocus(true);
      }}
      className={clsx(
        classes.root,
        hasFocus ? classes.focused : classes.blured,
        customClass?.(hasFocus ? "focused" : "blured")
      )}
    >
      {children}
    </div>
  );
}
