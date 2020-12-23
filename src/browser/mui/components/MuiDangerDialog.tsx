import {
  MuiCancelButton,
  MuiConfirmButton,
} from "@dabsi/browser/mui/components/MuiButton";
import {
  MuiDialog,
  MuiDialogProps,
} from "@dabsi/browser/mui/components/MuiDialog";
import { Override } from "@dabsi/common/typings2/Override";
import { ReactCallback } from "@dabsi/react/ReactCallback";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import { ReactNode } from "react";

export type MuiDangerDialogProps = Override<
  MuiDialogProps,
  {
    TypographyProps?: TypographyProps;

    actionTitle?: ReactNode;
    title?: ReactNode;
    objectTitle?: ReactNode;
    text?: ReactNode;

    onCancel?: ReactCallback;
    onConfirm?: ReactCallback;
  }
>;
const DEFAULT_TITLE = lang`CONFIRM_TO_${"action"}`;
const DEFAULT_TEXT = lang`YOU_ARE_SURE_YOU_WANT_TO_${"action"}_${"object"}?`;

export function MuiDangerDialog({
  onCancel,
  onConfirm,
  actionTitle,
  objectTitle,
  title,
  text,
  TypographyProps,
  ...MuiDialogProps
}: MuiDangerDialogProps) {
  const action = actionTitle ?? lang`ACTION`;
  return (
    <MuiDialog
      {...MuiDialogProps}
      title={title ?? DEFAULT_TITLE({ action })}
      actions={
        <>
          <MuiCancelButton
            onClick={event => {
              onCancel?.(event);
            }}
          />
          <MuiConfirmButton
            danger
            title={lang`CONFIRM`}
            onClick={event => {
              onConfirm?.(event);
            }}
          />
        </>
      }
    >
      <Typography {...TypographyProps}>
        {text ??
          DEFAULT_TEXT({
            action,
            object: objectTitle ?? lang`OBJECT`,
          })}
      </Typography>
    </MuiDialog>
  );
}
