import Grid, {GridProps} from "@material-ui/core/Grid";
import React from "react";
import {MuiIcon} from "../../../../browser/src/old/orders/MuiIcon";
import {ValueOrFactory} from "../../../common/patterns/ValueOrFactory";
import {LangNode} from "../../../localization/Lang";
import {mergeCallback} from "../../../react/utils/mergeCallback";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";

export type MuiActionProps<T = any> = {
    title: LangNode,
    icon?: MuiIcon,
    MuiButtonProps?: MuiButtonProps;
    context?: T;
    handle?(context: T);
    item?: boolean
    GridProps?: Partial<GridProps>;
};

export function MuiAction<T>(action: MuiActionProps<T>) {
    let children = <MuiButton
        ButtonProps={{variant: "contained"}}
        color={"primary"}
        title={action.title}
        icon={action.icon}
        {...action.MuiButtonProps}
        onClick={mergeCallback(action.MuiButtonProps?.onClick, () => {
            action.handle?.(ValueOrFactory(action.context) as any)
        })}
    />
    if (action.item) {
        children = <Grid item {...action.GridProps}>{children}</Grid>
    }
    return children
}


export type MuiActionsProps<T> = {
    context?: ValueOrFactory<T>,
    actions: MuiActionProps<T>[]

};


export const MuiActionProps = <T extends any>(defaultProps: MuiActionProps<T>,
                                              props: Partial<MuiActionProps<T> | undefined>): MuiActionProps<T> => ({
    ...defaultProps, ...props,
    handle: mergeCallback(defaultProps.handle, props?.handle)
});

export function MuiActions<T>(props: MuiActionsProps<T>) {
    return <Grid container direction={"row"} spacing={1}>
        {props.actions.map((action, index) =>
            <MuiAction key={index} item context={props.context} {...action} />
        )}
    </Grid>;
}
