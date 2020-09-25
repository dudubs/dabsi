import Button, { ButtonProps } from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import * as React from "react";
import { ReactNode, useRef, useState } from "react";
import { assert } from "../../../common/assert";
import { AssignKeys, Awaitable, Common } from "../../../common/typings";
import { Lang } from "../../../localization/Lang";
import { mergeProps } from "../../../react/utils/mergeProps";
import { MuiIcon } from "../MuiIcon";

export const MuiButtonKinds: Record<string, MuiButtonProps> = {
  delete: {
    icon: "delete",
    title: Lang`DELETE`,
    color: "secondary",
  },
  cancel: { icon: "cancel", title: Lang`CANCEL` },
  submit: { icon: "send", title: Lang`SUBMIT` },
  edit: { icon: "edit", title: Lang`EDIT` },
  add: { icon: "add", title: Lang`ADD` },
  reset: { icon: "reset", title: Lang`RESET` },
  close: { icon: "close", title: Lang`CLOSE` },
  confirm: { icon: "done", title: Lang`CONFIRM` },
  danger: { icon: "warning" },
};

export type MuiButtonProps = AssignKeys<
  Common<ButtonProps, IconButtonProps>,
  {
    iconOnly?: boolean;
    icon?: MuiIcon;
    title?: ReactNode;

    danger?: boolean;

    TooltipProps?: Partial<TooltipProps>;
    IconButtonProps?: Partial<IconButtonProps>;
    ButtonProps?: Partial<ButtonProps>;

    onAsyncClick?(): Awaitable;

    contained?: boolean;
    fullWidth?: boolean;
    kind?: string;
  }
>;

function renderMuiButton({
  title,
  icon,
  ButtonProps,
  IconButtonProps,
  iconOnly,
  TooltipProps,
  contained,
  fullWidth,
  kind,
  onAsyncClick,
  danger: isDanger,
  ...props
}: MuiButtonProps) {
  const isClicked = useRef<boolean>(false);

  if (iconOnly) {
    assert(icon);
    let element = (
      <IconButton
        color={isDanger ? "secondary" : undefined}
        {...IconButtonProps}
        {...props}>
        {MuiIcon(icon)}
      </IconButton>
    );

    if ((title = title || TooltipProps?.title)) {
      return (
        <Tooltip title={title} {...TooltipProps}>
          {element}
        </Tooltip>
      );
    }
    return element;
  }

  return (
    <Button
      color={isDanger ? "secondary" : undefined}
      {...{
        variant: contained ? "contained" : undefined,
        fullWidth,
      }}
      endIcon={MuiIcon(icon)}
      {...mergeProps(props, {
        async onClick() {
          if (isClicked.current) return;
          isClicked.current = true;
          try {
            await onAsyncClick?.();
          } finally {
            isClicked.current = false;
          }
        },
      })}
      {...ButtonProps}>
      {title}
    </Button>
  );
}

export function MuiButton(props: MuiButtonProps) {
  if (props.kind) {
    const kindProps = MuiButtonKinds[props.kind];
    if (kindProps) props = { ...kindProps, kind: undefined, ...props };
    return renderMuiButton({ ...kindProps, ...props });
  }
  return renderMuiButton(props);
}
