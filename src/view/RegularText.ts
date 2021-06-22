import { Renderer } from "@dabsi/view/react/renderer";
import createFragment from "@dabsi/view/react/createFragment";
import React from "react";

export type RegularTextProps = {
  children?: React.ReactNode;
  variant?: "error" | "primary" | "secondary" | "warning";
};

export declare namespace RegularText {
  let renderer: Renderer<RegularTextProps> | undefined;
}

export function RegularText(props: RegularTextProps): React.ReactElement {
  return RegularText.renderer
    ? RegularText.renderer(props)
    : createFragment(props.children);
}

export default RegularText;
