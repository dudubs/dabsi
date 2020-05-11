import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import {MUIIconButton} from "../../../../../browser/src/mui/components/MUIIconButton";
import {MUIModal} from "../../../../../browser/src/mui/components/MUIModal";
import {Lang} from "../../../../localization/Lang";
import {ModalStack} from "../../../../react/ModalStack";
import {mergeCallback} from "../../../../react/utils/mergeCallback";
import {AnyMUIDataTable, MUIDataTableAction} from "./index";

export function renderAction(
    table: AnyMUIDataTable,
    ms: ModalStack,
    action: MUIDataTableAction<any>,
    index: number,
    getKeys: () => string[]
) {
    if (!action.icon)
        return;
    return <Tooltip key={index} title={action.title}>
        <MUIIconButton
            size={"small"}
            color={action.danger ? "secondary" : undefined}
            {...action.MUIIconButtonProps}
            tooltip={action.title}
            key={index}
            icon={action.icon}
            onClick={mergeCallback(action.MUIIconButtonProps?.onClick,
                async () => {
                    if (action.danger) {
                        ms.push(<MUIModal
                            text={Lang`ARE_YOU_SURE?`}
                            actions={[
                                {
                                    title: Lang`CANCEL`,
                                    endIcon: "cancel"
                                },
                                {
                                    title: action.title,
                                    onClick: () => action.handle?.(getKeys(), table),
                                    endIcon: action.icon,
                                    color: "secondary"
                                },

                            ]}/>)
                    } else {
                        await action.handle?.(getKeys(), table);
                    }
                }
            )}/>
    </Tooltip>
}
