import React from "react";
import {MuiConfirmDialog} from "../../components/MuiConfirmDialog";
import {DataKey} from "../../../../data/DataKey";
import {DataRow} from "../../../../data/DataRow";
import {getTableActionKey} from "../../../../data/DataTable";
import {Lang} from "../../../../localization/Lang";
import {ModalStack, ModalStackContext} from "../../../../react/ModalStack";
import {EmptyFragment} from "../../../../react/utils/EmptyFragment";
import {useDefinedContext} from "../../../../react/utils/hooks/useDefinedContext";
import {mergeCallback} from "../../../../react/utils/mergeCallback";
import {partialProps} from "../../../../react/utils/partialProps";
import {MuiButton} from "../../components/MuiButton";
import {AnyMuiDataTable, MuiDataTableAction} from "./index";

export function renderTableAction(
    table: AnyMuiDataTable,
    ms: ModalStack,
    action: MuiDataTableAction<any>,
    index: number,
    getKeys: () => string[]
) {

    const key = getTableActionKey(index);
    if (!action.icon)
        return;
    return <MuiButton
        iconOnly
        IconButtonProps={{size: "small"}}
        title={action.title}
        danger={action.danger}
        {...action.MuiButtonProps}
        key={key}
        icon={action.icon}
        onClick={mergeCallback(action.MuiButtonProps?.onClick, async () => {
            if (action.danger && !await ms.pick(
                partialProps(MuiConfirmDialog, {
                    text: Lang`YOU_ARE_SURE?`,
                    ConfirmButtonProps: {
                        kind: "danger",
                        title: action.title
                    }
                })
            )) {
                return;
            }
            await table.executeAction(action, getKeys());
        })}/>
}

export function MuiDataTableAction(props: {
    table: AnyMuiDataTable,
    action: MuiDataTableAction<any>,
    index: number,
    item: DataRow<any>
}) {

    const key = getTableActionKey(props.index);
    const {action, table} = props;
    const ms = useDefinedContext(ModalStackContext);

    if (!props.action.icon)
        return EmptyFragment;

    if (action.visible && !action.visible(props.item)) {
        return EmptyFragment;
    }

    return <MuiButton
        iconOnly
        IconButtonProps={{size: "small"}}
        title={action.title}
        danger={action.danger}
        {...action.MuiButtonProps}
        key={key}
        icon={action.icon}
        onClick={mergeCallback(action.MuiButtonProps?.onClick, async () => {
            if (action.danger && !await ms.pick(
                partialProps(MuiConfirmDialog, {
                    text: Lang`YOU_ARE_SURE?`,
                    ConfirmButtonProps: {
                        kind: "danger",
                        title: action.title
                    }
                })
            )) {
                return;
            }
            await table.executeSingleAction(action, DataKey(props.item));
        })}/>
}
