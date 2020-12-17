import List from "@material-ui/core/List";
import React, { ReactNode } from "react";
import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { useStore } from "@dabsi/react/useStore";
import { Store } from "@dabsi/store";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import { MuiNestedMenuChild } from "@dabsi/browser/mui/nested-menu/MuiNestedMenuChild";

export type MuiNestedMenuProps<T> = {
  store?: Store<MuiNestedMenuState<T>>;
  children: Record<string, T>;
  getChildren: (root: T) => Record<string, T>;

  getChildIcon(child: T): MuiIcon;
  getChildTitle(child: T): ReactNode;
  onChildClick(path: MuiNestedMenuPath<T>);
};

export class MuiNestedMenuState<T> {
  currentPath: MuiNestedMenuPath<T>[] = [];
  selectedChild;
}

export type MuiNestedMenuPath<T> = {
  parent?: MuiNestedMenuPath<T>;
  child: T;
  key: string;
  depth: number;
  index: number;
};

export function MuiNestedMenu<T>(props: MuiNestedMenuProps<T>) {
  const { store } = useStore(MuiNestedMenuState);

  const children = {};
  const rootChildren = {};

  for (const [key, child] of entries(props.children)) {
    if (hasKeys(props.getChildren(child))) {
      children[key] = child;
    } else {
      rootChildren[key] = child;
    }
  }
  return (
    <List>
      {mapObjectToArray(rootChildren, (child, key, index) => (
        <MuiNestedMenuChild<T>
          asRoot
          {...child}
          store={store}
          path={{ child, key, index, depth: 0 }}
          child={child}
          menuProps={props}
          key={key}
        />
      ))}
      {mapObjectToArray(children, (child, key, index) => (
        <MuiNestedMenuChild<T>
          {...child}
          store={store}
          path={{ child, key, index, depth: 0 }}
          child={child}
          menuProps={props}
          key={key}
        />
      ))}
    </List>
  );
}
