import { entries } from "@dabsi/common/object/entries";
import LangKey from "@dabsi/view/lang/LangKey";
import {
  Button,
  ButtonProps,
  Grid,
  GridProps,
  IconButton,
  IconButtonProps,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";

export type MuiAction = {
  title?: React.ReactNode;
  icon?: React.ReactElement;

  type?: "menu" | "button";

  tooltip?: false | React.ReactNode;

  onAction?(event: React.SyntheticEvent): void;

  IconButtonProps?: Partial<IconButtonProps>;
  ButtonProps?: Partial<ButtonProps>;
  TooltipProps?: Partial<TooltipProps>;
};

export type MuiActionsProps = {
  actions: {
    [K in string]: MuiAction;
  };

  onAction?(event: React.SyntheticEvent, actionKey: string): void;

  IconButtonProps?: IconButtonProps;
  ButtonProps?: ButtonProps;
  ContainerProps?: GridProps;
  ItemProps?: GridProps;
  MenuProps?: Partial<MenuProps>;
  MenuItemTypographyProps?: TypographyProps;
  MenuItemProps?: MenuItemProps;
  TooltipProps?: Partial<TooltipProps>;
};

export default function MuiActions(p: MuiActionsProps): React.ReactElement {
  type Action = MuiAction & { key: string };
  const menuActions: Action[] = [];
  const iconButtonActions: Action[] = [];
  const buttonActions: Action[] = [];

  for (const [key, action] of entries(p.actions)) {
    const isButton = action.type === "button";
    const isMenu = !isButton && action.type === "menu";

    const isIconButton = !!action.icon && !isMenu && !isButton;

    (isMenu
      ? menuActions
      : isIconButton
      ? iconButtonActions
      : buttonActions
    ).push({
      key,
      ...action,
      title: <LangKey token={key}>{action.title}</LangKey>,
      tooltip: isButton && !action.tooltip ? false : action.tooltip,
    });
  }

  if (menuActions.length) {
    iconButtonActions.push({
      tooltip: false,
      icon: <MoreVertIcon />,
      ...p.actions.menu,
      key: "menu",
      onAction: event => {
        setMenuAnchorEl(event.target);
      },
    });
  }

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null as any);

  const handleAction = (event, action: Action) => {
    action.onAction?.(event);
    p.onAction?.(event, action.key);
  };

  const buttonItem = (action: Action, button: React.ReactElement) => (
    <Grid {...p.ItemProps} item key={action.key}>
      {action.tooltip !== false ? (
        <Tooltip
          {...p.TooltipProps}
          {...action.TooltipProps}
          title={action.tooltip ?? action.title!}
        >
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </Grid>
  );
  return (
    <>
      {menuAnchorEl && (
        <Menu
          {...p.MenuProps}
          open
          anchorEl={menuAnchorEl}
          onClose={() => {
            setMenuAnchorEl(null);
          }}
        >
          {menuActions.map(action => (
            <MenuItem
              {...(p.MenuItemProps as {})}
              key={action.key}
              onClick={event => {
                setMenuAnchorEl(null);
                handleAction(event, action);
              }}
            >
              {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
              <Typography color="inherit" {...p.MenuItemTypographyProps}>
                {action.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
      <Grid {...p.ContainerProps} container>
        {iconButtonActions.map(action =>
          buttonItem(
            action,
            <IconButton
              {...p.IconButtonProps}
              {...action.IconButtonProps}
              onClick={event => {
                handleAction(event, action);
              }}
            >
              {action.icon}
            </IconButton>
          )
        )}
        {buttonActions.map(action =>
          buttonItem(
            action,
            <Button
              {...p.ButtonProps}
              {...action.ButtonProps}
              onClick={event => {
                handleAction(event, action);
              }}
            >
              {action.title}
            </Button>
          )
        )}
      </Grid>
    </>
  );
}
