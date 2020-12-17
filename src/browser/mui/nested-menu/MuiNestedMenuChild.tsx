import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { ReactElement } from "react";
import { flat } from "@dabsi/common/iterator/flat";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { LangKey } from "@dabsi/lang/LangKey";
import { Store } from "@dabsi/store";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import {
  MuiNestedMenuPath,
  MuiNestedMenuProps,
  MuiNestedMenuState,
} from "@dabsi/browser/mui/nested-menu/MuiNestedMenu";

export const useStyles = makeStyles(theme => ({
  itemWithChildText: {},
  asParent: {
    fontWeight: "bold",
    fontSize: theme.typography.fontSize,
  },
  asChild: {},
  listItemText: {
    fontSize: theme.typography.fontSize,
  },
  listItemIcon: {
    minWidth: 35,
  },
  nested: {
    paddingLeft: 30,
  },
}));

export function MuiNestedMenuChild<T>({
  onClick,
  path,
  child,
  asRoot,
  ...props
}: {
  child: T;
  onClick?();
  menuProps: MuiNestedMenuProps<T>;
  path: MuiNestedMenuPath<T>;
  store: Store<MuiNestedMenuState<T>>;
  asRoot?: boolean;
}): ReactElement {
  const classes = useStyles();
  const { key: key, depth: depth } = path;
  const {
    menuProps,
    store: { state, store },
  } = props;

  const isOpen = depth === 0 ? true : state.currentPath[depth]?.child === child;

  const title = <LangKey for={key}>{menuProps.getChildTitle(child)}</LangKey>;

  const children = menuProps.getChildren(child);

  const hasChildren = hasKeys(children);

  if (asRoot) {
    return renderListItem();
  }

  if (depth === 0) {
    return (
      <>
        <ListItem>
          <ListItemText disableTypography>
            <Typography className={classes.asParent}>{title}</Typography>
          </ListItemText>
        </ListItem>
        {renderCollapseList()}
      </>
    );
  }

  return (
    <>
      {renderListItem()}
      {renderCollapseList()}
    </>
  );
  function setOpen(open) {
    if (open) {
      !isOpen &&
        store.set("currentPath", [
          ...flat(path, x => (x.parent ? [x.parent] : []), "after"),
        ]);
    } else if (isOpen) {
      store.set("currentPath", []);
    }
  }

  function renderListItemIcon() {
    return (
      <ListItemIcon className={classes.listItemIcon}>
        {MuiIcon(menuProps.getChildIcon(child))}
      </ListItemIcon>
    );
  }

  function renderList() {
    return (
      <List
        disablePadding
        className={clsx({
          [classes.nested]: depth > 1,
        })}
      >
        {mapObjectToArray(children, (child, key, index) => (
          <MuiNestedMenuChild
            {...props}
            path={{
              parent: path,
              child,
              key,
              index,
              depth: depth + 1,
            }}
            child={child}
            key={key}
            onClick={() => {}}
          />
        ))}
      </List>
    );
  }

  function renderCollapseList() {
    return depth === 0 ? (
      renderList()
    ) : (
      <Collapse in={isOpen}>{renderList()}</Collapse>
    );
  }

  function renderListItem() {
    return (
      <ListItem
        button
        selected={state.selectedChild === child}
        onClick={() => {
          onClick?.();
          setOpen(!isOpen);
          store.set("selectedChild", child);
          menuProps.onChildClick(path);
        }}
      >
        {renderListItemIcon()}
        <ListItemText
          primaryTypographyProps={{
            className: clsx(
              classes.listItemText,
              hasChildren ? classes.asParent : classes.asChild
            ),
          }}
        >
          {title}
        </ListItemText>

        <ListItemSecondaryAction>
          {hasChildren &&
            MuiIcon(
              isOpen
                ? require(`@material-ui/icons/ExpandLess`)
                : require(`@material-ui/icons/ExpandMore`)
            )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
