import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import { Override } from "@dabsi/common/typings2/Override";
import { updateRef } from "@dabsi/react/HookRef";
import { partialProps } from "@dabsi/react/utils/partialProps";
import Button, { ButtonProps } from "@material-ui/core/Button";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import * as React from "react";
import {
  ComponentType,
  createElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";

export type MuiButtonProps<P = {}> =
  | Override<ButtonProps, BaseProps & P>
  | Override<IconButtonProps, BaseProps & P>;

type BaseProps = {
  ButtonProps?: ButtonProps;
  IconButtonProps?: IconButtonProps;
  renderOnClick?(close: () => void, getEl: () => any): ReactElement;
  disableTooltip?: boolean;
  iconOnly?: boolean;
  TooltipProps?: Partial<TooltipProps>;
  danger?: boolean;
  icon?: MuiIcon;
  title?: ReactNode;
  buttonType?: ComponentType<MuiButtonProps>;
};

export function MuiButton(props: MuiButtonProps) {
  if (props.buttonType) {
    return createElement(props.buttonType, {
      ...props,
      buttonType: undefined,
    });
  }

  let {
    ButtonProps,
    IconButtonProps,
    renderOnClick,
    TooltipProps,
    disableTooltip,
    iconOnly,
    buttonRef: initButtonRef,
    buttonType,
    ...buttonProps
  }: MuiButtonProps = props;

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<unknown>(null);
  let element: ReactElement;

  let type: ComponentType;
  if (iconOnly) {
    type = IconButton;
    buttonProps = {
      ...buttonProps,
      ...IconButtonProps,
    };
  } else {
    type = Button;
    buttonProps = {
      ...buttonProps,
      ...ButtonProps,
    };
  }

  const { title, danger, icon, onClick, ...elementProps } = buttonProps as any;
  if (danger) {
    elementProps.color = "secondary";
  }
  elementProps.buttonRef = current => {
    updateRef(initButtonRef, current);
    updateRef(buttonRef, current);
  };
  elementProps.onClick = event => {
    onClick?.(event);
    setOpen(true);
  };

  if (iconOnly) {
    elementProps.children = MuiIcon(icon);
  } else {
    elementProps.endIcon = MuiIcon(icon);
    elementProps.children = title;
  }

  element = createElement(type, elementProps);

  if ((title || TooltipProps) && !disableTooltip) {
    element = (
      <Tooltip title={title} {...TooltipProps}>
        {element}
      </Tooltip>
    );
  }

  if (open) {
    element = (
      <>
        {element}
        {renderOnClick?.(
          () => setOpen(false),
          () => buttonRef.current!
        )}
      </>
    );
  }
  return element;
}

export const MuiCancelButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Cancel"),
  title: lang`CANCEL`,
});

export const MuiConfirmButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Done"),
  title: lang`CONFIRM`,
});

export const MuiResetButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Clear"),
  title: lang`RESET`,
});

export const MuiCloseButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Close"),
  title: lang`CLOSE`,
});

export const MuiAddButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Add"),
  title: lang`ADD`,
});

export const MuiSubmitButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Send"),
  title: lang`Submit`,
});

export const MuiEditButton = partialProps(MuiButton, {
  icon: require("@material-ui/icons/Edit"),
  title: lang`EDIT`,
});
