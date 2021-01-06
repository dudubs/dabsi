import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import AclUserBasicInfoInput from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoInput";
import AclUserGroupsForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserGroupsForm";
import { useSystemViewTheme } from "@dabsi/system/core/view/useSystemViewTheme";
import { Form } from "@dabsi/typerpc/widget/form/Form";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React, { useState } from "react";

WidgetRouterView(
  AclAdminRouter.at("editUser"),
  params => AclAdminConnection.usersManager.edit(params.userId),
  props => {
    const [title, setTitle] = useState("");

    useSystemViewTheme(use => {
      function updateTitle({ firstName = "", lastName = "" } = {}) {
        setTitle(`${firstName} ${lastName}`);
      }

      use(Form, MuiEditFormView);

      use(AclUserBasicInfoInput, props => (
        <MuiGridMapView
          for={mergeProps(props, {
            onChange: input => {
              updateTitle(input?.value);
            },
            inputRef: input => {
              setTimeout(() => {
                updateTitle(input?.value);
              });
            },
          })}
          children={{
            firstName: { GridProps: { xs: 6 } },
            lastName: { GridProps: { xs: 6 } },
          }}
        />
      ));

      use(AclUserGroupsForm.at("input"), props => (
        <MuiDataInputMapView {...props} itemGridProps={{ xs: 4 }} />
      ));
    });

    return (
      <MuiSystemPage
        title={lang`EDIT_USER`}
        breadcrumbTitle={title}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <MuiAccordionMapView
          for={props}
          exclude={AclAdminViewOptions.editUser.excludeChildKeys}
          wrappers={AclAdminViewOptions.editUser.childWrapperMap}
        />
      </MuiSystemPage>
    );
  }
);
