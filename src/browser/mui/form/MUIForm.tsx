import {Grid} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {useContext, useRef} from "react";
import {Form, FormProps, FormProvider} from "../../../../common/form/Form";
import {expandIf} from "../../../common/array/expandIf";
import {definedAt} from "../../../common/object/defined";
import {Lang, LangNode} from "../../../localization/Lang";
import {ModalStackItem, ModalStackItemContext} from "../../../react/ModalStack";
import {mergeCallback} from "../../../react/utils/mergeCallback";
import {mergeRef} from "../../../react/utils/Ref";
import {MUIAction, MUIActions} from "./MUIActions";
import {MUIDialog} from "./MUIDialog";

export const MUIFormOld = (({children, ...props}) => {
    return <FormProvider {...props}>
        <Grid container spacing={1} direction={"column"}>
            {children}
        </Grid>
    </FormProvider>
})

export type MUIFormAction = MUIAction<{
    form: Form,
    msi: ModalStackItem | null
}>;

export type MUIFormProps = FormProps & {


    noCancel?: boolean;
    cancellable?: boolean,
    onCancel?(): void

    dialog?: boolean,

    title?: LangNode

    submit?: Partial<MUIFormAction>;
    reset?: Partial<MUIFormAction>;
    cancel?: Partial<MUIFormAction>
};


export const MUIFormSubmitAction: MUIFormAction = {
    title: Lang`SUBMIT`, icon: "submit",
    handle: ({form}) => form.submit()
}
export const MUIFormResetAction: MUIFormAction = {
    title: Lang`RESET`, icon: "reset",
    handle: ({form}) => form.reset()
};

export const MUIFormCancelAction: MUIFormAction = {
    title: Lang`CANCEL`,
    icon: "cancel",
    handle: ({msi}) => {
        msi?.pop();
    }
};

export const MUIForm =
    ({
         onCancel,
         noCancel,
         serviceRef,
         children,
         dialog,
         title,
         cancellable,
         submit: submitAction,
         reset: resetAction,
         cancel: cancelAction,
         ...props
     }: MUIFormProps) => {
        const service = useRef<Form>(null);
        const msi = useContext(ModalStackItemContext);

        const withCancel = cancellable || (dialog && !noCancel);


        const actions = <MUIActions
            context={() => ({
                form: definedAt(service, "current"),
                msi
            })}
            actions={[
                ...expandIf(withCancel) ?? [
                    MUIAction(MUIFormCancelAction, cancelAction, {handle: () => onCancel?.()})
                ],
                MUIAction(MUIFormResetAction, resetAction),
                MUIAction(MUIFormSubmitAction, submitAction)
            ]}/>;


        return <FormProvider {...props} serviceRef={mergeRef(serviceRef, service)}
                             onSubmit={mergeCallback(props.onSubmit, () => {
                                 dialog && msi?.pop();
                             })}>
            {dialog ? renderDialog() : renderGrid()}
        </FormProvider>

        function renderGrid() {
            return <Grid container spacing={1}
                         direction={"column"}>
                <Grid>
                    {children}
                </Grid>
                <Grid item>
                    {actions}
                </Grid>
            </Grid>
        }

        function renderDialog() {
            return <MUIDialog open={true} onClose={() => {
                if (!noCancel) {
                    onCancel?.();
                }
            }}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </MUIDialog>
        }
    };
