import Menu from "@material-ui/core/Menu";
import * as React from "react";
import { ReactElement, ReactNode, useRef, useState } from "react";
import { mergeRefs } from "@dabsi/react/utils/mergeRefs";
import { MuiButton, MuiButtonProps } from "@dabsi/browser/mui/components/MuiButton";
import { mergeElementProps, mergeProps } from "@dabsi/react/utils/mergeProps";

export function MuiButtonMenu({
  children,
  ...MuiButtonProps
}: MuiButtonProps<{ children?: ReactNode }>): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>();
  return (
    <>
      <MuiButton
        {...mergeProps(MuiButtonProps, {
          buttonRef: ref,
          onClick: () => {
            setOpen(true);
          },
        })}
      />
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
