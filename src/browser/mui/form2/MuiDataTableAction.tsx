import * as React from "react"; import {ReactNode} from "react";
import {
    MuiConfirmDialog,
    MuiConfirmDialogProps
} from "../components/MuiConfirmDialog";
import {useModalStack} from "../../../react/ModalStack";
import {mergeProps} from "../../../react/utils/mergeProps";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";
import {MuiIcon} from "../MuiIcon";

export type MuiDataTableActionProps<E> = {
    MuiButtonProps?: Partial<MuiButtonProps>
    title: ReactNode
    icon: MuiIcon;
    onClick?(event:E): void
    danger?: {
        MuiConfirmDialogProps?: Partial<MuiConfirmDialogProps>
        confirmText: ReactNode
    };

};

export function MuiDataTableAction(props: MuiDataTableActionProps<null>) {
    const ms = useModalStack();
    const dangerProps = props.danger;
    return <MuiButton
        iconOnly
        {...mergeProps(props.MuiButtonProps, {
            IconButtonProps: {
                size: "small" as const
            },
            onClick: async () => {

                if (dangerProps && !await ms.pick(modalProps =>
                    <MuiConfirmDialog
                        {...modalProps}
                        {...dangerProps.MuiConfirmDialogProps}
                        text={dangerProps.confirmText}
                    />
                )) {
                    return;
                }
                props.onClick?.(null)
            }
        })}
        danger={!!dangerProps}
        title={props.title}
        icon={props.icon}

    />
}
