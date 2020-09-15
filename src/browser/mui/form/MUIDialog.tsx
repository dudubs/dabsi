import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import DialogActions, {DialogActionsProps} from "@material-ui/core/DialogActions";
import DialogContent, {DialogContentProps} from "@material-ui/core/DialogContent";
import DialogTitle, {DialogTitleProps} from "@material-ui/core/DialogTitle";
import {Theme} from "@material-ui/core/styles";
import {makeStyles} from "@material-ui/styles";
import React, {ReactNode, useContext} from "react";
import {AssignKeys} from "../../../common/typings";
import {ModalStackItemContext} from "../../../react/ModalStack";
import {mergeProps} from "../../../react/utils/mergeProps";
import {MuiButton} from "../components/MuiButton";
import {ReactWrapper, wrap} from "../data/wrap";

const useStyles = makeStyles((theme: Theme) => {
    return ({
        root: {
            flip: false,
            direction: theme.direction
        }
    });
})

export type MuiDialogProps = AssignKeys<Omit<DialogProps, "open">, {
    actions?: ReactNode,
    title?: ReactNode;
    popOnClose?: boolean
    cancellable?: boolean
    onCancel?(): void
    closable?: boolean
    onClose?(): void
    DialogContentProps?: DialogContentProps;
    DialogTitleProps?: DialogTitleProps;
    DialogActionsProps?: DialogActionsProps;


    contentWrapper?: ReactWrapper;
}>;

export function MuiDialog
({
     actions,

     contentWrapper,
     title,
     DialogTitleProps,
     DialogActionsProps,
     DialogContentProps,
     popOnClose,
     cancellable,
     closable,
     onCancel,
     onClose,


     ...DialogProps
 }: MuiDialogProps) {
    const styles = useStyles();
    const msi = useContext(ModalStackItemContext);

    if (cancellable || closable) {
        actions = <>
            {cancellable && <MuiButton kind={"cancel"} onClick={() => {
                msi?.pop()
                onCancel?.();
            }}/>}
            {actions}
            {closable && <MuiButton kind={"close"} onClick={() => {
                msi?.pop()
                onClose?.();
            }}/>}
        </>
    }

    return <Dialog
        open={true}
        onClose={() => {
            popOnClose && msi?.pop();
        }}
        {...mergeProps(DialogProps, {
            className: styles.root,
        })}>
        {title && <DialogTitle {...DialogTitleProps}>{title}</DialogTitle>}
        {wrap(contentWrapper)(
            <DialogContent {...DialogContentProps}>
                {DialogProps.children}
            </DialogContent>
        )}
        {actions && <DialogActions {...DialogActionsProps}>
            {actions}
        </DialogActions>}
    </Dialog>


}

/*


 */
