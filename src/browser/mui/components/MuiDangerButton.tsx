import React from "react";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import {
  MuiButton,
  MuiButtonProps,
} from "@dabsi/browser/mui/components/MuiButton";
import {
  MuiDangerDialog,
  MuiDangerDialogProps,
} from "@dabsi/browser/mui/components/MuiDangerDialog";

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
      renderOnClick={close => (
        <MuiDangerDialog
          {...mergeProps(MuiDangerDialogProps, {
            onCancel: () => close(),
            onConfirm: event => {
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
