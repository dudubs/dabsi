import Button, {ButtonProps} from "@material-ui/core/Button";
import IconButton, {IconButtonProps} from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip, {TooltipProps} from "@material-ui/core/Tooltip";
import React, {createElement, ReactNode} from "react";
import {MuiIcon} from "../../../../browser/src/old/orders/MuiIcon";
import {assert} from "../../../common/assert";
import {Common, Assign} from "../../../common/typings";
import {Lang} from "../../../localization/Lang";
import {EmptyFragment} from "../../../react/utils/EmptyFragment";

export const MuiButtonKinds: Record<string, MuiButtonProps> = {
    delete: {
        icon: "delete", title: Lang`DELETE`,
        color: "secondary"
    },
    cancel: {icon: "cancel", title: Lang`CANCEL`,},
    submit: {icon: "send", title: Lang`SUBMIT`},
    edit: {icon: "edit", title: Lang`EDIT`},
    add: {icon: "add", title: Lang`ADD`},
    reset: {icon: "reset", title: Lang`RESET`},
    close: {icon: "close", title: Lang`CLOSE`},
    confirm: {icon: "done", title: Lang`CONFIRM`},
    danger: {icon: "warning"}
};

export type MuiButtonProps = Assign<Common<ButtonProps, IconButtonProps>, {
    iconOnly?: boolean,
    icon?: string;
    title?: ReactNode;

    danger?: boolean

    TooltipProps?: Partial<TooltipProps>;
    IconButtonProps?: Partial<IconButtonProps>;
    ButtonProps?: Partial<ButtonProps>;

    contained?: boolean,
    fullWidth?: boolean,
    kind?: string
}>;


export function MuiButton(props: MuiButtonProps) {

    if (props.kind) {
        const kindProps = MuiButtonKinds[props.kind];
        if (kindProps)
            props = {...kindProps, ...props}
    }

    let {
        title, icon,
        ButtonProps,
        IconButtonProps,
        iconOnly,
        TooltipProps,
        contained,
        fullWidth,
        kind,
        danger: isDanger,
        ...nextProps
    } = props;

    if (iconOnly) {
        assert(icon);
        let element = <IconButton
            color={isDanger ? "secondary" : undefined}
            {...IconButtonProps}
            {...nextProps}
        >{MuiIcon(icon)}</IconButton>

        ;
        if (title = title || TooltipProps?.title) {
            return <Tooltip title={title} {...TooltipProps}>{element}</Tooltip>
        }
        return element;
    }

    return <Button
        color={isDanger ? "secondary" : undefined}
        {...{
            variant: contained ? "contained" : undefined,
            fullWidth
        }}
        endIcon={MuiIcon(icon)}
        {...nextProps}
        {...ButtonProps}>
        {title}
    </Button>
}
