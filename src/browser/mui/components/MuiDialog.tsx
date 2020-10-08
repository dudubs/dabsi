import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions, {
  DialogActionsProps,
} from "@material-ui/core/DialogActions";
import DialogContent, {
  DialogContentProps,
} from "@material-ui/core/DialogContent";
import DialogTitle, { DialogTitleProps } from "@material-ui/core/DialogTitle";
import * as React from "react";
import { ReactNode } from "react";
import {
  MuiButton,
  MuiButtonProps,
  MuiCancelButton,
  MuiSubmitButton,
} from "./MuiButton";

import { mergeProps } from "../../../react/utils/mergeProps";

export type MuiDialogProps = Omit<DialogProps, "title"> & {
  content?: ReactNode;
  actions?: ReactNode;
  title?: ReactNode;
  DialogContentProps?: DialogContentProps;
  DialogActionsProps?: DialogActionsProps;
  DialogTitleProps?: DialogTitleProps;
  children?: ReactNode;

  MuiSubmitButtonsProps?: MuiButtonProps;
  MuiCancelButtonProps?: MuiButtonProps;
  onSubmit?(): void;
  onCancel?(): void;

  // MuiActionsProps?: MuiActionsProps<C,"submit"|"cancel">
};

export function MuiDialog({
  content,
  actions,
  title,
  children,
  DialogContentProps,
  DialogActionsProps,
  DialogTitleProps,
  onCancel,
  onSubmit,
  MuiCancelButtonProps,
  MuiSubmitButtonsProps,
  ...DialogProps
}: MuiDialogProps) {
  if (onCancel || onSubmit) {
    actions = (
      <>
        {onSubmit && (
          <MuiSubmitButton
            {...mergeProps(MuiSubmitButtonsProps, {
              onClick() {
                onSubmit();
              },
            })}
          />
        )}
        {actions}
        {onCancel && (
          <MuiCancelButton
            {...mergeProps(MuiCancelButtonProps, {
              onClick() {
                onCancel();
              },
            })}
          />
        )}
      </>
    );
  }
  return (
    <Dialog {...DialogProps}>
      {title && <DialogTitle {...DialogTitleProps}>{title}</DialogTitle>}
      {(content || children) && (
        <DialogContent {...DialogContentProps}>
          {content}
          {children}
        </DialogContent>
      )}
      {actions && (
        <DialogActions {...DialogActionsProps}>{actions}</DialogActions>
      )}
    </Dialog>
  );
}
