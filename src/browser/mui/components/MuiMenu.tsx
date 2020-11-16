import Menu, { MenuProps } from "@material-ui/core/Menu";
import * as React from "react";
import { cloneElement } from "react";
import { mergeProps } from "../../../react/utils/mergeProps";

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
      })}
    >
      {React.Children.map(props.children, child =>
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
