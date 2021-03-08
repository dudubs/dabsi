import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { useEmittedState } from "@dabsi/view/react/reactor/useEmittedState";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { ReactRef } from "@dabsi/view/react/ref";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useBodyListener } from "./useBodyListener";

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: theme.shape.borderRadius,
      },
      withPadding: {
        padding: theme.spacing(2),
      },
      inline: {
        display: "inline-block",
      },
      focused: {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        "&.$withPadding": {
          padding: theme.spacing(2) - 1,
        },
      },
      blured: {
        "&:hover": {
          borderColor: theme.palette.grey[800],
        },
      },
    }),
  { name: "focusable" }
);

const cachedEvents = new WeakSet<any>();
const ON_FOCUS = Emittable<{ focusId: number }>();

export type MuiFocusableProps = {
  children: React.ReactNode;
  disablePadding?: boolean;
  inline?: boolean;
  inlineToolbar?: React.ReactElement;
  onFocus?();
  onBlur?();
  customClass?(state: "blured" | "focused"): string;
  id?: string;
  forceFocus?: boolean;
  divRef?: React.Ref<HTMLDivElement>;
};
let counter = 0;
let currentPopoverId = new Set<any>();

const useFocusId = () => useMemo(() => ++counter, []);

export function MuiFocusable({
  children,
  onFocus,
  onBlur,
  customClass,
  id,
  forceFocus,
  divRef: _divRef,
  inline,
  disablePadding,
}: MuiFocusableProps) {
  const classes = useStyles();
  const emitter = useEmitter();
  const [hasFocus, setFocus] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const focusId = useFocusId();

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

  useEmittedState(ON_FOCUS, event => {
    if (currentPopoverId.size) return;
    setFocus(event?.focusId === focusId);
  });

  useEffect(() => {
    forceFocus && emitter(ON_FOCUS, { focusId });
  }, [forceFocus]);

  useBodyListener(
    "mousedown",
    event => {
      if (currentPopoverId.size) return;
      const isChild = divRef.current?.contains(event.target as any) || false;
      !isChild && updateFocus(false);
    },
    [hasFocus]
  );

  return (
    <div
      id={id}
      ref={ReactRef.merge(divRef, _divRef)}
      onMouseDown={event => {
        if (currentPopoverId.size) return;

        if (!cachedEvents.touch(event)) {
          updateFocus(false);
          return;
        }
        updateFocus(true);
      }}
      className={clsx(
        classes.root,
        hasFocus ? classes.focused : classes.blured,
        customClass?.(hasFocus ? "focused" : "blured"),
        !disablePadding && classes.withPadding,
        inline && classes.inline
      )}
    >
      {children}
    </div>
  );
}

export const MuiDisabledFocusable = ({
  children,
  component: Component = "div" as "div" | "span",
}) => {
  const focusId = useFocusId();
  React.useEffect(() => {
    return () => {
      currentPopoverId.delete(focusId);
    };
  }, []);
  return (
    <Component
      onMouseEnter={() => currentPopoverId.add(focusId)}
      onMouseLeave={() => {
        currentPopoverId.delete(focusId);
      }}
    >
      {children}
    </Component>
  );
};
