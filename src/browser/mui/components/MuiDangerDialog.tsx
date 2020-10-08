import Typography, { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import { ReactNode } from "react";
import { MuiDialog, MuiDialogProps } from "./MuiDialog";
import { Override } from "../../../common/typings";
import { Lang, LangNode } from "../../../localization/Lang";
import { ReactCallback } from "../../../react/ReactCallback";
import { MuiButton, MuiCancelButton, MuiConfirmButton } from "./MuiButton";

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
            onClick={(event) => {
              onCancel?.(event);
            }}
          />
          <MuiConfirmButton
            danger
            title={Lang`CONFIRM`}
            onClick={(event) => {
              onConfirm?.(event);
            }}
          />
        </>
      }>
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
