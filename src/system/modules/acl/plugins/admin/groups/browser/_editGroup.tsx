import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { AclBreadcrumbs } from "@dabsi/system/modules/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/modules/acl/plugins/admin/common/AclAdminRpc";
import AclGroupBasicInfoForm from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupBasicInfoForm";
import AclGroupBasicInfoInput from "@dabsi/system/modules/acl/plugins/admin/groups/common/AclGroupBasicInfoInput";
import MuiSystemPage from "@dabsi/system/browser/MuiSystemPage";
import { MuiAccordionMapView } from "@dabsi/system/browser/MuiAccordionMapView";
import { useSystemView } from "@dabsi/system/view/useSystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React, { useState } from "react";

WidgetRouterView(
  AclAdminRouter.at("editGroup"),
  params => AclAdminConnection.groupsManager.edit(params.groupId),
  props => {
    const [title, setTitle] = useState("");

    useSystemView(AclGroupBasicInfoForm, props => (
      <MuiEditFormView {...props} />
    ));

    useSystemView(AclGroupBasicInfoInput.at(":groupName"), props =>
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
