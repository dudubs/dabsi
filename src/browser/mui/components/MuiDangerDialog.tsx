import Typography, { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import { ReactNode } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { MuiDialog, MuiDialogProps } from "@dabsi/browser/mui/components/MuiDialog";
import { Lang, LangNode } from "@dabsi/lang/Lang";
import { ReactCallback } from "@dabsi/react/ReactCallback";
import { MuiButton, MuiCancelButton, MuiConfirmButton } from "@dabsi/browser/mui/components/MuiButton";

export type MuiDangerDialogProps = Override<
  MuiDialogProps,
  {
    TypographyProps?: TypographyProps;

    actionTitle?: LangNode;
    title?: ReactNode;
    objectTitle?: LangNode;
    text?: ReactNode;

    onCancel?: ReactCallback;
    onConfirm?: ReactCallback;
  }
>;
const DEFAULT_TITLE = Lang`CONFIRM_TO_${"action"}`;
const DEFAULT_TEXT = Lang`YOU_ARE_SURE_YOU_WANT_TO_${"action"}_${"object"}?`;

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
  const action = actionTitle ?? Lang`ACTION`;
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
            title={Lang`CONFIRM`}
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
            object: objectTitle ?? Lang`OBJECT`,
          })}
      </Typography>
    </MuiDialog>
  );
}
