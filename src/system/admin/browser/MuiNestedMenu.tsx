import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import LangKey from "@dabsi/view/lang/LangKey";
import { ReactContext, ReactContextType } from "@dabsi/view/react/ReactContext";
import { Emitter, useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import {
  Collapse,
  List,
  ListItem,
  ListItemIconProps,
  ListItemProps,
  ListItemSecondaryAction,
  ListItemText,
  ListItemTextProps,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import React from "react";

export type MuiNestedMenuItem = {
  ListItemIconProps?: ListItemIconProps;
  ListItemProps?: ListItemProps;
  ListItemTextProps?: ListItemTextProps;
};

export type MuiNestedMenu<C extends ReactContext = ReactContext> = {
  [K in string]: MuiNestedMenuItem & {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    children?: MuiNestedMenu<C>;
    onClick?(event: React.SyntheticEvent, context: C);
  };
};

export const MuiNestedMenuState = {};

const useStyles = makeStyles(theme => ({
  ...(mapArrayToObject([0, 1, 2, 3, 4], i => [
    "nested-" + i,
    {
      paddingLeft: i * 20,
    },
  ]) as {}),

  "text-0": {
    fontSize: theme.typography.fontSize,
    fontWeight: "bold",
  },

  text: {
    fontSize: theme.typography.fontSize,
  },
}));

//x
export function MuiNestedMenu<C extends ReactContext = ReactContext>(
  p: MuiNestedMenuItem & {
    tree: MuiNestedMenu<C>;
    onItemClick?(item: MuiNestedMenuItem);
    contextType?: ReactContextType<C>;
  }
): React.ReactElement {
  const classes = useStyles();
  const context: C = new (p.contextType || ReactContext)() as any;

  const [openMap, setOpenMap] = React.useState({} as Record<string, boolean>);

  const renderItem = (
    item: MuiNestedMenu<C>[string],
    key,
    {
      depth,
      path: parentPath,
    }: {
      depth: number;
      path: string;
    }
  ) => {
    const path = parentPath + "/" + key;
    const open = openMap[path] || false;
    const setOpen = open => {
      setOpenMap({ ...openMap, [path]: open });
    };

    const children = hasKeys(item.children) && (
      <>
        {mapObjectToArray(item.children!, (item, key) =>
          renderItem(item, key, {
            depth: depth + 1,
            path,
          })
        )}
      </>
    );
    return (
      <React.Fragment key={key}>
        <ListItem
          button
          {...(p.ListItemProps as {})}
          {...(item.ListItemProps as {})}
          onClick={event => {
            if (children) {
              setOpen(!open);
            }
            item.onClick?.(event, context);
          }}
        >
          <ListItemText
            {...p.ListItemTextProps}
            {...item.ListItemTextProps}
            disableTypography
          >
            <Typography
              className={clsx(
                classes["text-" + depth],
                classes["nested-" + depth],
                classes.text
              )}
            >
              <LangKey token={key}>{item.title}</LangKey>
            </Typography>
          </ListItemText>
          {children && depth > 0 && (
            <ListItemSecondaryAction>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemSecondaryAction>
          )}
        </ListItem>
        {children && depth > 0 ? (
          <Collapse in={open}>{children}</Collapse>
        ) : (
          children
        )}
      </React.Fragment>
    );
  };

  return (
    <List disablePadding dense>
      {mapObjectToArray(p.tree, (item, key) =>
        renderItem(item, key, { depth: 0, path: "" })
      )}
    </List>
  );
}
