import React from "react";
import { ComponentClass, createElement, ReactElement } from "react";
import EmptyFragment from "@dabsi/view/react/EmptyFragment";

const MuiIconMap: Record<string, string> = {
  submit: "send",
  reset: "clear",
};

export type MuiIcon =
  | string
  | { default: ComponentClass }
  | undefined
  | React.ReactElement;

export function MuiIcon(arg: MuiIcon): ReactElement {
  if (typeof arg === "string")
    return arg ? (
      <i className={"material-icons"}>{MuiIconMap[arg] ?? arg}</i>
    ) : (
      <></>
    );
  if (arg?.["default"]) return createElement(arg["default"]);

  if (React.isValidElement(arg)) return arg;

  return EmptyFragment;
}
