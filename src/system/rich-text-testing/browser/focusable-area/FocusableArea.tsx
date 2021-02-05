import { touchSet } from "@dabsi/common/map/touchSet";
import { Listener } from "@dabsi/common/patterns/Listener";
import { WeakId } from "@dabsi/common/WeakId";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";

let counter = 0;

const useStyles = makeStyles({
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: -100,
  },
  inline: {
    display: "inline-block",
  },
  containerWithSelection: {
    position: "relative",
  },

  selection: {
    position: "absolute",
    zIndex: -99,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

class FocusableArea2Context {
  catchedFocus = new Set();
  onFocus = Listener<[event: React.SyntheticEvent, focusId: number]>();
}
const Context = React.createContext(new FocusableArea2Context());

export type FocusableAreaProps = {
  children: React.ReactNode;
  inline?: boolean;
  root?: boolean;
  onMoveStart?(event: React.SyntheticEvent);
  onMoveEnd?(event: React.SyntheticEvent);
  onFocus?(event: React.SyntheticEvent);
  onBlur?(event: React.SyntheticEvent);
  disableSelection?: boolean;
  classes?: {
    selectionOnMove?: string;
    selection?: string;
    selectionOnFocus?: string;

    move?: string;
    focus?: string;
  };
  divProps?: React.ComponentPropsWithRef<"div">;
};

function FocusableArea(props: FocusableAreaProps) {
  const { divProps, inline: isInline, root: isRoot, disableSelection } = props;
  const context = React.useContext(Context);
  const classes = useStyles();
  const [isMove, setIsMove] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const focusId = useMemo(() => ++counter, []);

  useEffect(() => {
    return context.onFocus((event, newFocusId) => {
      if (newFocusId === focusId) {
        if (!isFocus) {
          setIsFocus(true);
          props.onFocus?.(event);
        }
      } else if (isFocus) {
        setIsFocus(false);
        props.onBlur?.(event);
      }
    });
  }, [focusId, isFocus]);

  return (
    <>
      {!disableSelection && isRoot && (
        <div
          className={classes.background}
          onMouseDown={event => {
            context.onFocus.invoke(event, 0);
          }}
        />
      )}
      <div
        {...mergeProps(divProps, {
          className: clsx(
            divProps?.className,
            !disableSelection && classes.containerWithSelection,
            isInline && classes.inline,
            isFocus ? props.classes?.focus : isMove && props.classes?.move
          ),
          onMouseMove: event => {
            if (touchSet(context.catchedFocus, event)) {
              if (!isMove) {
                setIsMove(true);
                props.onMoveStart?.(event);
              }
            } else {
              if (isMove) {
                setIsMove(false);
                props.onMoveEnd?.(event);
              }
            }
          },
          onMouseLeave: event => {
            if (isMove) {
              setIsMove(false);
              props.onMoveEnd?.(event);
            }
          },
          onMouseDown: event => {
            isMove && context.onFocus.invoke(event, focusId);
            console.log("div focus", WeakId(event));
          },
        })}
      >
        {!disableSelection && (isFocus || isMove) && (
          <div
            className={clsx(
              classes.selection,
              props.classes?.selection,
              isFocus
                ? props.classes?.selectionOnFocus
                : props.classes?.selectionOnMove
            )}
          />
        )}
        {props.children}
      </div>
    </>
  );
}

namespace FocusableArea {
  export function Disabled({ children }) {
    const context = React.useContext(Context);
    return (
      <div
        onMouseMove={event => {
          context.catchedFocus.add(event);
        }}
      >
        {children}
      </div>
    );
  }
}
export default FocusableArea;
