import { createElement, Fragment, ReactElement, ReactNode } from "react";
import { entries } from "@dabsi/common/object/entries";
import { values } from "@dabsi/common/object/values";
import { Renderer } from "@dabsi/react/renderer";

export function MapView<
  T extends Record<string, ReactElement>,
  G extends string
>(props: {
  fields: T;

  groups?: { [K in string & keyof T]?: G };

  containers?: { [K in G]?: Renderer<ReactElement> };
}): ReactElement {
  const keyToElement = { ...props.fields };

  const groupToElements: Record<string, ReactElement[]> = {};
  for (const [key, group] of entries(props.groups)) {
    const elements = groupToElements[group!] || (groupToElements[group!] = []);
    elements.push(keyToElement[key]);
    delete keyToElement[key];
  }

  const children: ReactNode[] = [];
  for (const [group, render] of entries(props.containers)) {
    children.push(
      createElement(Fragment, { key: group }, render(groupToElements[group]))
    );
    delete groupToElements[group];
  }

  children.push(...values(keyToElement));
  return createElement(Fragment, null, children);
}
