import Collapse from "@material-ui/core/Collapse";
import _List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { ImmutableRecord, ImmutableSet } from "../../immutable2";
import { LangKey } from "../../lang/LangKey";
import { StateProps } from "../../react/stateHelpers";
import { partialProps } from "../../react/utils/partialProps";
import { MuiIcon } from "./components/MuiIcon";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },

  itemWithChildText: {},
  parent: {
    // fontWeight: "bold",
  },
  listItemText: {
    fontSize: theme.typography.fontSize,
  },
}));
const List = partialProps(_List, {
  // dense: true,
});

export type MuiNestedMenuProps = {
  title?: ReactNode;
  icon?: MuiIcon;
  onClick?();
  children?: Record<string, MuiNestedMenuProps>;
};

class MuiNestedMenuState extends ImmutableRecord({
  selectedPath: "",
}) {}

export function MuiNestedMenu({
  children,
}: {
  children: Record<string, MuiNestedMenuProps>;
}) {
  const classes = useStyles();
  const [state, setState] = useState(() => new MuiNestedMenuState());

  return (
    <List>
      {mapObjectToArray(children, (child, key) => (
        <MuiNestedMenuChild
          {...child}
          key={key}
          menuPath={key}
          menuKey={key}
          depth={0}
          classes={classes}
          state={state}
          setState={setState}
        />
      ))}
    </List>
  );
}

export function MuiNestedMenuChild({
  children,
  title,
  icon,
  onClick,
  depth,
  menuPath,
  menuKey,
  ...props
}: MuiNestedMenuProps &
  StateProps<MuiNestedMenuState> & {
    menuPath: string;
    depth: number;
    menuKey: string;
    classes: ReturnType<typeof useStyles>;
  }) {
  const [isOpen, setOpen] = useState(false);
  const { classes, setState, state } = props;

  const itemIcon = <ListItemIcon>{MuiIcon(icon)}</ListItemIcon>;

  const hasChildren = hasKeys(children);

  return (
    <>
      <ListItem
        button
        selected={state.selectedPath === menuPath}
        onClick={() => {
          setState(state.set("selectedPath", menuPath));
          onClick?.();
          if (hasChildren) {
            setOpen(!isOpen);
          }
        }}
      >
        {itemIcon}
        <ListItemText
          primaryTypographyProps={{
            className: clsx(
              classes.listItemText,
              hasKeys(children) && classes.parent
            ),
          }}
        >
          <LangKey for={menuKey}>{title}</LangKey>
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
      {isOpen && (
        <Collapse in>
          <List disablePadding className={clsx(depth > 0 && classes.nested)}>
            {mapObjectToArray(children || {}, (childProps, key) => (
              <MuiNestedMenuChild
                {...props}
                depth={depth + 1}
                key={key}
                menuPath={menuPath + "/" + key}
                menuKey={key}
                onClick={() => {}}
                {...childProps}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
