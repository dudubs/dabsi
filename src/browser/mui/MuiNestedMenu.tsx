import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { ReactNode, useState } from "react";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { MuiIcon } from "./components/MuiIcon";

export type MuiNestedMenuProps = {
  title?: ReactNode;
  icon?: MuiIcon;
  onClick?();
  children?: Record<string, MuiNestedMenuProps>;
};

export function MuiNestedMenu(
  props: MuiNestedMenuProps & {
    root?: boolean;
  }
) {
  const { root: isRoot } = props;
  console.log({ props });
  const [isOpen, setOpen] = useState(isRoot);

  const childMenus = mapObjectToArray(
    props.children || {},
    (childProps, key) => {
      return (
        <MuiNestedMenu
          key={key}
          {...childProps}
          root={false}
          title={childProps.title || key}
        />
      );
    }
  );

  const hasChildren = hasKeys(props.children);
  const hasIndex = hasChildren && !!props.onClick;

  const itemIcon = props.icon && (
    <ListItemIcon>{MuiIcon(props.icon)}</ListItemIcon>
  );

  let element = (
    <>
      {isRoot ? (
        childMenus
      ) : (
        <>
          <ListItem
            button
            onClick={() => {
              if (hasKeys(props.children)) {
                setOpen(!isOpen);
              }
            }}
          >
            {hasIndex ? false : itemIcon}
            <ListItemText>{props.title}</ListItemText>
          </ListItem>
          {isOpen && (
            <Collapse in>
              {hasIndex && <ListItem>{itemIcon}</ListItem>}
              {childMenus}
            </Collapse>
          )}
        </>
      )}
    </>
  );

  if (isRoot) {
    element = <List>{element}</List>;
  }

  return element;
}
