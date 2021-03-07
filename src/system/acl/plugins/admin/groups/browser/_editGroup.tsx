import { MuiEditFormView } from "@dabsi/browser/mui/widget/MuiEditFormView";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { AclAdminGroupBasicInfoForm } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoForm";
import { AclAdminGroupBasicInfoInput } from "@dabsi/system/acl/plugins/admin/groups/common/basicInfoInput";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import React, { useState } from "react";

WidgetRouterView.define(
  AclAdminRouter.at("editGroup"),
  params => AclAdminConnection.groupsManager.edit(params.groupId),
  props => {
    const [title, setTitle] = useState("");

    SystemView.use(AclAdminGroupBasicInfoForm, props => (
      <MuiEditFormView {...props} />
    ));

    SystemView.use(AclAdminGroupBasicInfoInput.at(":groupName"), props =>
      mergeProps(props, {
        inputRef: input => {
          setTimeout(() => {
            setTitle(input?.value || "");
          }, 0);
        },
        onChange: input => {
          setTitle(input.value || "");
        },
      })
    );

    return (
      <MuiSystemPage
        title={title}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Groups}
      >
        <MuiAccordionMapView for={props} />
      </MuiSystemPage>
    );
  }
);
