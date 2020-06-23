/*


 */
import IconButton, {IconButtonProps} from "@material-ui/core/IconButton";
import Tooltip, {TooltipProps} from "@material-ui/core/Tooltip";
import React, {forwardRef, ReactNode} from "react";
import {Assign} from "../../../common/typings";
import {MuiIcon, MuiIconName} from "../../../../browser/src/old/orders/MuiIcon";

export type MuiIconButtonProps = Assign<IconButtonProps, {
    icon: MuiIconName | undefined,
    tooltip?: ReactNode;
    TooltipProps?: Partial<TooltipProps>;
}>;

export const MuiIconButtonOld = forwardRef(({icon, tooltip, TooltipProps, ...props}: MuiIconButtonProps, ref) => {

    const children = <IconButton {...props} buttonRef={ref}>
        {MuiIcon(icon)}
    </IconButton>;

    if (tooltip) {
        return <Tooltip {...TooltipProps} title={tooltip}>{children}</Tooltip>
    }
    return children;
});
