/*


 */
import IconButton, {IconButtonProps} from "@material-ui/core/IconButton";
import Tooltip, {TooltipProps} from "@material-ui/core/Tooltip";
import React, {forwardRef, ReactNode} from "react";
import {MuiIcon} from "../../../../browser/src/old/orders/MuiIcon";
import {Assign} from "../../../common/typings";

export type MuiIconButtonProps = Assign<IconButtonProps, {
    icon: MuiIcon,
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
