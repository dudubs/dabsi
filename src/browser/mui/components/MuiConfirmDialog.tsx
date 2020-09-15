import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {TypographyProps} from "@material-ui/system";
import React, {ReactNode} from "react";
import {MuiButton, MuiButtonProps} from "./MuiButton";
import {MuiDialog, MuiDialogProps} from "../form/MuiDialog";
import {PickerProps} from "../../../react/ModalStack";

export type MuiConfirmDialogProps = PickerProps<boolean> & {
    text?: ReactNode;
    children?: ReactNode;
    ConfirmButtonProps?: MuiButtonProps;
    CancelButtonProps?: MuiButtonProps;
    DialogProps?: MuiDialogProps;
    TextTypographyProps?: TypographyProps;
};

export function MuiConfirmDialog(props: MuiConfirmDialogProps) {
    return <MuiDialog {...props.DialogProps}>
        <DialogContent>
            {props.text && <Typography {...props.TextTypographyProps}>{props.text}</Typography>}
            {props.children}
        </DialogContent>
        <DialogActions>
            <MuiButton kind={"cancel"} {...props.CancelButtonProps} onClick={() => props.onPick?.(false)}/>
            <MuiButton kind={"confirm"} {...props.ConfirmButtonProps} onClick={() => props.onPick?.(true)}/>
        </DialogActions>
    </MuiDialog>
}

