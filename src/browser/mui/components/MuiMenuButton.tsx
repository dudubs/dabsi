import Menu, {MenuProps} from "@material-ui/core/Menu";
import {MenuItemProps} from "@material-ui/core/MenuItem";
import React, {createElement, ReactElement, useRef, useState} from "react";
import {ArrayOrValue} from "../../../common/patterns/ArrayOrValue";
import {mergeCallback} from "../../../react/utils/mergeCallback";
import {mergeRefs} from "../../../react/utils/mergeRefs";
import {MuiButton, MuiButtonProps} from "./MuiButton";

export type MuiMenuButtonProps = MuiButtonProps & {
    MenuProps?: Omit<MenuProps, "open" | "anchorEl">,
    children?: ArrayOrValue<ReactElement<MenuItemProps>>;
};

export function MuiMenuButton({MenuProps, children, ...props}: MuiMenuButtonProps) {
    const buttonRef = useRef<any>(null);
    const [isOpen, setOpen] = useState(false);
    return <>
        <Menu {...MenuProps} anchorEl={() => buttonRef.current} open={isOpen}
              onClose={mergeCallback(MenuProps?.onClose, () => setOpen(false))}>
            {children && React.Children.map(children as any, ({props, type}: ReactElement<MenuItemProps>) => {
                return createElement(type, {
                    ...props,
                    onClick: mergeCallback(props.onClick, () => {
                        setOpen(false)
                    })
                })
            })}
        </Menu>
        <MuiButton
            buttonRef={mergeRefs(props.buttonRef, buttonRef)}
            {...props}
            onClick={mergeCallback(props.onClick, () => {
                setOpen(true);
            })}/>
    </>
}
