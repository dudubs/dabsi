import { touchSet } from "@dabsi/common/map/touchSet";
import { Listener } from "@dabsi/common/patterns/Listener";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  ComponentType,
  createContext,
  createElement,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type FocusableInstance = {
  isFocus: false;
  isMove: false;
};

class FocusableContext {
  events = new WeakSet();
  listener = Listener<[event: React.SyntheticEvent, focusId: number]>();
}
const useStyles = makeStyles({
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: -100,
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

type FocusableProps = {
  component?: ComponentType<React.HTMLAttributes<any>>;

  children?: ReactNode;
  onFocus?(event: React.SyntheticEvent);
  onBlur?(event: React.SyntheticEvent);
  onChildFocus?(event: React.SyntheticEvent);
  onChildBlur?(event: React.SyntheticEvent);
  onMoveStart?(event: React.SyntheticEvent);
  onMoveEnd?(event: React.SyntheticEvent);
  root?: boolean;
  classes?: {
    selection?: string;
    selectionOnMove?: string;
    selectionOnFocus?: string;
  };
};

export type Focusable = {
  (props: FocusableProps): ReactElement;
  Disabled(props: { children: ReactElement }): ReactElement;
};

let counter = 0;

export function createFocusable() {
  const Context = createContext(new FocusableContext());

  Component.Disabled = function ({ children }) {
    const context = useContext(Context);
  };

  function Component({
    component: Container = "div" as any,
    classes: customClasses = {},
    root: isRoot,
    children,
    ...props
  }: FocusableProps) {
    const classes = useStyles();
    const context = useContext(Context);

    const [isMove, setIsMove] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const id = useMemo(() => ++counter, []);

    return (
      <>
        {isRoot && (
          <div
            className={classes.background}
            onMouseDown={event => {
              context.listener.invoke(event, 0);
            }}
          />
        )}
        <Container
          className={classes.container}
          onMouseMove={event => {
            if (touchSet(context.events, event)) {
              if (!isMove) {
                setIsMove(true);
                props.onMoveStart?.(event);
              } else if (isMove) {
                setIsMove(false);
                props.onMoveEnd?.(event);
              }
            }
          }}
          onMouseLeave={event => {
            if (isMove) {
              setIsMove(false);
              props.onMoveEnd?.(event);
            }
          }}
          onMouseDown={event => {
            isMove && context.listener.invoke(event, id);
          }}
        >
          {(isFocus || isMove) && (
            <div
              className={clsx(
                classes.selection,
                customClasses.selection,
                isFocus
                  ? customClasses.selectionOnFocus
                  : customClasses.selectionOnMove
              )}
            />
          )}
          {children}
        </Container>
      </>
    );
  }
}
