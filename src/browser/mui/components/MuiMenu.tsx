import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import * as React from "react";
import {
  cloneElement,
  createElement,
  ReactElement,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrayOrValue } from "../../../common/patterns/ArrayOrValue";
import { OmitKeys } from "../../../common/typings";
import { Renderer } from "../../../react/renderer";
import { mergeCallback } from "../../../react/utils/mergeCallback";
import { mergeProps } from "../../../react/utils/mergeProps";
import { mergeRefs } from "../../../react/utils/mergeRefs";
import { RouterType } from "../../../typerouter/Router";
import { MuiButton, MuiButtonProps } from "./MuiButton";
import use = RouterType.use;

export function MuiMenu({
  closeOnClick,
  ...props
}: MenuProps & { closeOnClick?(): void }) {
  return (
    <Menu
      {...mergeProps(props, {
        onClose() {
          closeOnClick?.();
        },
      })}>
      {React.Children.map(props.children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child,
              mergeProps(child.props, {
                onClick(event) {
                  closeOnClick?.();
                },
              })
            )
          : child
      )}
    </Menu>
  );
}
