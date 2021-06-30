import MuiTemplate from "@dabsi/system/admin/browser/MuiTemplate";
import MuiSiteToolbarMenu from "@dabsi/system/site/browser/MuiSiteToolbarMenu";
import MuiSiteDrawerMenu from "@dabsi/system/site/browser/MuiSiteDrawerMenu";

import React from "react";

export type MuiSiteWrapperProps = {
  children: React.ReactNode;
  toolbarMenu?: React.ReactNode;
  drawerMenu?: React.ReactNode;
  title?: React.ReactNode;
};

const _renderComponents = (components, p: { after?; before? } = {}) => {
  if (p.before || p.after || components.length)
    return (
      <>
        {p.before}
        {components.map((component, index) =>
          React.createElement(component, { key: index })
        )}
        {p.after}
      </>
    );
};

export default function MuiSiteWrapper(
  p: MuiSiteWrapperProps
): React.ReactElement {
  return (
    <MuiTemplate
      openDrawerMenu
      title={p.title || lang`SITE`}
      toolbarMenu={_renderComponents(MuiSiteToolbarMenu, {
        after: p.toolbarMenu,
      })}
      drawerMenu={_renderComponents(MuiSiteDrawerMenu, {
        after: p.drawerMenu,
      })}
    >
      <>{p.children}</>
    </MuiTemplate>
  );
}
