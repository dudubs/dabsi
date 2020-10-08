import * as React from "react";
import { mergeProps } from "../../../react/utils/mergeProps";
import { MuiButton, MuiButtonProps } from "./MuiButton";
import { MuiDangerDialog, MuiDangerDialogProps } from "./MuiDangerDialog";

export type MuiDangerButtonProps = MuiButtonProps<{
  MuiDangerDialogProps?: Partial<MuiDangerDialogProps>;
}>;

export function MuiDangerButton({
  MuiDangerDialogProps,
  onClick,
  ...props
}: MuiDangerButtonProps) {
  return (
    <MuiButton
      danger
      {...props}
      renderOnClick={(close) => (
        <MuiDangerDialog
          {...mergeProps(MuiDangerDialogProps, {
            onCancel: () => close(),
            onConfirm: (event) => {
              close();
              onClick?.(event);
            },
          })}
          open
        />
      )}
    />
  );
}
