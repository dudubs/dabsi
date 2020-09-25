import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import { ReactNode } from "react";
import { Lang, LangNode } from "../../../localization/Lang";
import { MuiButton } from "./MuiButton";

export type MuiDangerDialogProps = DialogProps & {
  TypographyProps?: TypographyProps;

  actionTitle?: LangNode;
  title?: ReactNode;
  objectTitle?: LangNode;
  text?: ReactNode;

  onCancel?();
  onConfirm?();
};
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
  ...props
}: MuiDangerDialogProps) {
  const action = actionTitle ?? Lang`ACTION`;
  return (
    <Dialog {...props}>
      <DialogTitle>{title ?? DEFAULT_TITLE({ action })}</DialogTitle>
      <DialogContent>
        <Typography {...TypographyProps}>
          {text ??
            DEFAULT_TEXT({
              action,
              object: objectTitle ?? Lang`OBJECT`,
            })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <MuiButton
          kind={"cancel"}
          title={Lang`CANCEL`}
          onClick={() => {
            onCancel?.();
          }}
        />
        <MuiButton
          kind={"confirm"}
          danger
          title={Lang`CONFIRM`}
          onClick={() => {
            onConfirm?.();
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
