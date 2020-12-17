import * as React from "react";
import { ComponentClass, createElement, ReactElement } from "react";
import { EmptyFragment } from "@dabsi/react/utils/EmptyFragment";

const MuiIconMap: Record<string, string> = {
  submit: "send",
  reset: "clear",
};

export type MuiIcon = string | { default: ComponentClass } | undefined;

export function MuiIcon(arg: MuiIcon): ReactElement {
  if (typeof arg === "string")
    return arg ? (
      <i className={"material-icons"}>{MuiIconMap[arg] ?? arg}</i>
    ) : (
      <></>
    );
  if (arg?.default) return createElement(arg.default);

  return EmptyFragment;
}
