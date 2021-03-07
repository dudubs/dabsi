import withStyles from "@dabsi/browser/mui/withStyles";
import { Override } from "@dabsi/common/typings2/Override";
import { RichTextEditor } from "@dabsi/system/rich-text/browser/editor/editor";
import { RichTextStore } from "@dabsi/system/rich-text/browser/editor/store";
import useEditorStore from "@dabsi/system/rich-text/browser/editor/useEditorStore";
import { ViewContext } from "@dabsi/view/react/context";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import { ReactRef } from "@dabsi/view/react/ref";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import clsx from "clsx";
import React from "react";

export type MuiEditorButtonProps = Override<
  ButtonProps,
  {
    selected?: boolean | ((store: RichTextStore) => boolean);
    icon: React.ReactElement;
    value?: any;
    buttonRef?: React.Ref<any>;
    currentStore?: boolean;
    renderMenu?(MenuComponent: typeof Menu, props: MenuProps);
    onPress?(store: RichTextStore);
  }
>;

export const MuiEditorButton = withStyles(theme => ({
  root: {
    margin: 0,
    // padding: 0,
    minWidth: 0,
    color: theme.palette.grey[600],
    borderColor: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  selected: {
    backgroundColor: theme.palette.grey[300],
  },
  clear: {
    position: "absolute",
    color: "red",
  },
}))<MuiEditorButtonProps>(
  (
    {
      value,
      currentStore: useCurrentStore,
      selected,
      children,
      icon,
      buttonRef,
      renderMenu,
      onPress,
      ...props
    },
    classes
  ) => {
    const anchorEl = React.useRef<any>(null);
    const [open, setOpen] = React.useState(false);

    const store = useCurrentStore
      ? useEditorStore()
      : ViewContext.require(RichTextEditor).root.store;
    if (typeof selected === "function") {
      selected = selected(store);
    }

    return (
      <>
        <Button
          ref={ReactRef.merge(buttonRef, anchorEl)}
          variant="text"
          size="small"
          {...mergeProps(props, {
            className: clsx(classes.root, selected && classes.selected),
            onClick: () => {
              setOpen(true);
            },
            onMouseDown: event => {
              if (onPress) {
                event.preventDefault();
                onPress(store);
              }
            },
          })}
        >
          {icon || children}
        </Button>

        {renderMenu &&
          renderMenu(Menu, {
            open: open,
            getContentAnchorEl: null,
            onClose: () => {
              setOpen(false);
            },
            anchorEl: () => anchorEl.current,
            keepMounted: true,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            onClick: () => {
              setOpen(false);
            },
          })}
      </>
    );
  }
);
