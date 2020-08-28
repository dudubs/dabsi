import {Grid} from "@material-ui/core";
import React, {ReactNode, Ref, useContext, useRef} from "react";
import {Form, FormContext, FormProps} from "../../../../common/form/Form";
import {AssignKeys} from "../../../common/typings";
import {Lang} from "../../../localization/Lang";
import {ModalStackItem, ModalStackItemContext} from "../../../react/ModalStack";
import {mergeProps} from "../../../react/utils/mergeProps";
import {partialProps} from "../../../react/utils/partialProps";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";
import {MuiActionProps} from "./MuiActions";
import {MuiDialog, MuiDialogProps} from "./MuiDialog";

export const MuiFormOld = (({children, ...props}) => {
    return <Form {...props}>
        <Grid container spacing={1} direction={"column"}>
            {children}
        </Grid>
    </Form>
})

export type MuiFormActionProps = MuiActionProps<{
    form: Form,
    msi: ModalStackItem | null
}>;

export type MuiFormProps = FormProps & {


    noCancel?: boolean;
    cancellable?: boolean,
    onCancel?(): void

    dialog?: boolean,

    title?: ReactNode

    submitTitle?: ReactNode;

    FormRef?: Ref<Form | undefined>;

    actions?: ReactNode;

    extraActions?: ReactNode;


    resetButton?: boolean;

    MuiSubmitProps?: Partial<MuiFormButtonProps>;
    MuiResetProps?: Partial<MuiFormButtonProps>;
    MuiCancelProps?: Partial<MuiFormButtonProps>;

    MuiDialogProps?: Partial<MuiDialogProps>;
};


export function MuiForm(
    {
        onCancel,
        noCancel,
        FormRef,
        children,
        dialog,
        title,
        cancellable,
        submitTitle,
        MuiSubmitProps,
        MuiResetProps,
        MuiCancelProps,
        actions,
        resetButton,
        MuiDialogProps, extraActions,
        ...props
    }: MuiFormProps) {
    const form = useRef<Form>(null);
    const msi = useContext(ModalStackItemContext);

    const withCancel = cancellable || (dialog && !noCancel);


    if (!actions) actions = <>
        {withCancel && <MuiFormButton.Cancel {...MuiCancelProps}/>}
        {resetButton && <MuiFormButton.Reset {...MuiResetProps}/>}
        <MuiFormButton.Submit{...MuiSubmitProps}
                             title={submitTitle ?? MuiSubmitProps?.title ?? Lang`SUBMIT`}/>
        {extraActions}
    </>;


    return <Form {...mergeProps(props, {

        ref: form,
        onChange: event => {
            switch (event) {
                case "cancel":
                    dialog && msi?.pop();
                    break;
                case "submit":
                    dialog && msi?.pop();
                    break;
            }
        }
    })}>
        {dialog ? renderDialog() : renderGrid()}
    </Form>

    function renderGrid() {
        return <Grid container spacing={2} direction={"column"}>
            <Grid item>
                {children}
            </Grid>
            <Grid item>
                {actions}
            </Grid>
        </Grid>
    }

    function renderDialog() {
        return <MuiDialog
            title={title}
            actions={actions}
            {...mergeProps(MuiDialogProps, {
                    onClose: () => {
                        if (!noCancel) {
                            onCancel?.();
                            msi?.pop();
                        }
                    }
                },
            )}
        >{children}</MuiDialog>
    }
}

export type MuiFormButtonProps = AssignKeys<MuiButtonProps, {
    onClick?(form: Form | undefined): void
}>;

export function MuiFormButton(
    {onClick, ...props}: MuiFormButtonProps
) {
    const form = useContext(FormContext);
    return <MuiButton {...props} onClick={() => onClick?.(form)}/>
}

MuiFormButton.Submit = partialProps(MuiFormButton, {
    kind: "submit",
    onClick: form => {
        form?.submit();
    }
});


MuiFormButton.Reset = partialProps(MuiFormButton, {
    kind: "reset",
    onClick: form => {
        form?.reset();
    }
});

MuiFormButton.Cancel = partialProps(MuiFormButton, {
    kind: "cancel",
    onClick: form => {
        form?.cancel();
    }
});


/*
    rx<ListItemProps<T>>(ListItem,[props, extraProps],
        ....
    )

    xs(ListItem )

 */
