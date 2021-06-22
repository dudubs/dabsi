import React from "react";

export type MuiSiteWrapperProps = {
  children: React.ReactElement;
};
export default function MuiSiteWrapper(
  p: MuiSiteWrapperProps
): React.ReactElement {
  return p.children;
}
