import { ButtonProps } from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import * as React from "react";
import { cloneElement, ReactElement, ReactNode, useRef, useState } from "react";
import { mergeElementProps, mergeProps } from "@dabsi/react/utils/mergeProps";
import { MuiButton } from "@dabsi/browser/mui/components/MuiButton";

export function MuiMenu({
  button,
  children,
}: {
  children?: ReactNode;

  button: (props: {
    buttonRef: ButtonProps["buttonRef"];
    onClick();
  }) => ReactElement;
}): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>();
  return (
    <>
      {button({
        buttonRef: ref,
        onClick: () => {
          setOpen(true);
        },
      })}
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={() => ref.current!}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return mergeElementProps(child, {
              onClick: event => {
                setOpen(false);
              },
            });
          }
          return child;
        })}
      </Menu>
    </>
  );
}
