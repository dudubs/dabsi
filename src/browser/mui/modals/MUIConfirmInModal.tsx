import Typography from "@material-ui/core/Typography";
import React, {ComponentType, ReactNode} from "react";
import {MUIButton} from "../../../../browser/src/mui/components/MUIButton";
import {MUIModal, MUIModalProps} from "../../../../browser/src/mui/components/MUIModal";
import {MUIModalInCenter} from "../../../../browser/src/mui/components/MUIModalInCenter";
import {Lang} from "../../../localization/Lang";
import {ModalStackItemContext} from "../../../react/ModalStack";
import {useContextOrType} from "../../../react/utils/hooks/useDefinedContext";
import {partialProps} from "../../../react/utils/partialProps";

export type MUIConfirmInModalProps = {
    children?: ReactNode,
    question?: ReactNode;
    cancelTypography?: boolean
    title?: ReactNode,
    acceptTitle?: ReactNode,
    cancelTitle?: ReactNode,
    onAccept?(): void;
    danger?: boolean

};


/*

    partalProps<MUIActionsInModal>
 */
export function MUIConfirmInModalOld(props: MUIConfirmInModalProps) {
    const msi = useContextOrType(ModalStackItemContext);
    return <MUIModalInCenter
        title={props.title}
        actions={<>
            <MUIButton
                title={props.cancelTitle ?? Lang`NO`} onClick={() => {
                msi?.pop();
            }}/>
            <MUIButton color={props.danger ? "secondary" : undefined}
                       title={props.acceptTitle ?? Lang`YES`} onClick={() => {
                msi?.pop();
                props.onAccept?.();
            }}/>
        </>}>
        {props.question && <Typography>{props.question}</Typography>}
        {props.children}
    </MUIModalInCenter>
}


export const MUIConfirmModal = partialProps(MUIModal as ComponentType<MUIModalProps<boolean>>, {
    actions: [
        {title: Lang`YES`, value: true},
        {title: Lang`NO`, value: false}
    ]
});

export const MUIConfirmToDeleteModal = partialProps(MUIModal as ComponentType<MUIModalProps<boolean>>, {

    actions: [
        {title: Lang`CANCEL`, value: false, endIcon: "cancel"},
        {title: Lang`DELETE`, value: true, color: "secondary" as const, endIcon: "delete"},
    ]
});

