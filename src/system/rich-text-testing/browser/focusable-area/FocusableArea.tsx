import { touchSet } from "@dabsi/common/map/touchSet";
import { Listener } from "@dabsi/common/patterns/Listener";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { View } from "@dabsi/react/view/View";
import { ViewState } from "@dabsi/react/view/ViewState";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, {
  Component,
  ComponentProps,
  ComponentType,
  createElement,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  container: {
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

function useDomEvent(element: HTMLElement, key: string, callback, deps: any[]) {
  useEffect(() => {
    element.addEventListener(key, callback);
    return () => {
      element.removeEventListener(key, callback);
    };
  }, deps);
}
export type FocusableAreaProps = {
  children: React.ReactNode;
  inline?: boolean;
  root?: boolean;
  onMoveStart?(event: React.SyntheticEvent);
  onMoveEnd?(event: React.SyntheticEvent);
  onFocus?(event: React.SyntheticEvent);
  onBlur?(event: React.SyntheticEvent);
  classes?: {
    move?: string;
    selection?: string;
    focus?: string;
  };
  divProps?: React.ComponentPropsWithRef<"div">;
};

function FocusableArea(props: FocusableAreaProps) {
  const { divProps, inline: isInline, root: isRoot } = props;
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
      {isRoot && (
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
            classes.container,
            isInline && classes.inline
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
          },
        })}
      >
        {(isFocus || isMove) && (
          <div
            className={clsx(
              classes.selection,
              props.classes?.selection,
              isFocus ? props.classes?.focus : props.classes?.move
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
