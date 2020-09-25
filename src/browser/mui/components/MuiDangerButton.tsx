import * as React from "react";
import { useState } from "react";
import { mergeProps } from "../../../react/utils/mergeProps";
import { MuiButton, MuiButtonProps } from "./MuiButton";
import { MuiDangerDialog, MuiDangerDialogProps } from "./MuiDangerDialog";

export function MuiDangerButton({
  MuiDangerDialogProps,
  onConfirm,
  ...props
}: MuiButtonProps & {
  onConfirm?(): void;
  MuiDangerDialogProps?: Partial<MuiDangerDialogProps>;
}) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      {showDialog && (
        <MuiDangerDialog
          {...mergeProps(MuiDangerDialogProps, {
            onCancel: () => setShowDialog(false),
            onConfirm: () => {
              setShowDialog(false);
              onConfirm?.();
            },
          })}
          open
        />
      )}
      <MuiButton
        danger
        {...mergeProps(props, {
          onClick: () => {
            setShowDialog(true);
          },
        })}
      />
    </>
  );
}
