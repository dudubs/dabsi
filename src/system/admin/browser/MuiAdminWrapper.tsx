import { ACL_CurrentUserReactor } from "@dabsi/system/acl/view";
import MuiAdminMenu from "@dabsi/system/admin/browser/MuiAdminMenu";
import { MuiTemplate } from "@dabsi/system/admin/browser/MuiTemplate";
import { SystemViewContext } from "@dabsi/system/core/view/SystemViewContext";
import React from "react";
import { MuiLoginFormView } from "./MuiLoginFormView";
import { MuiNestedMenu } from "./MuiNestedMenu";
import { MuiUserMenu } from "./MuiUserMenu";

export default function MuiAdminWrapper({ children }) {
  const currentUser = ACL_CurrentUserReactor.use();

  if (currentUser === null) {
    return (
      <MuiLoginFormView
        onLogin={event => {
          ACL_CurrentUserReactor.emit(event);
        }}
      />
    );
  }

  if (currentUser === undefined) {
    return <>{lang`LOADING`}</>;
  }

  return (
    <MuiTemplate
      openDrawerMenu
      title={lang`SYSTEM_ADMIN`}
      toolbarMenu={
        <MuiUserMenu userName={currentUser.fullName || currentUser.loginName} />
      }
      drawerMenu={
        <MuiNestedMenu tree={MuiAdminMenu} contextType={SystemViewContext} />
      }
    >
      {children}
    </MuiTemplate>
  );
}
