import { entries } from "@dabsi/common/object/entries";
import LangKey from "@dabsi/view/lang/LangKey";
import {
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
  menu?: boolean;
  tooltip?: false | React.ReactNode;

  onAction?(event: React.SyntheticEvent): void;

  IconButtonProps?: Partial<IconButtonProps>;
  TooltipProps?: Partial<TooltipProps>;
};

export type MuiActionsProps = {
  actions: {
    [K in string]: MuiAction;
  };

  onAction?(event: React.SyntheticEvent, actionKey: string): void;

  IconButtonProps?: IconButtonProps;
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
  const buttonActions: Action[] = [];

  for (const [key, action] of entries(p.actions)) {
    (action.menu || !action.icon ? menuActions : buttonActions).push({
      key,
      ...action,
      title: <LangKey token={key}>{action.title}</LangKey>,
    });
  }

  if (menuActions.length) {
    buttonActions.push({
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
        {buttonActions.map(action => {
          const button = (
            <IconButton
              {...p.IconButtonProps}
              {...action.IconButtonProps}
              onClick={event => {
                handleAction(event, action);
              }}
            >
              {action.icon}
            </IconButton>
          );
          return (
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
        })}
      </Grid>
    </>
  );
}
