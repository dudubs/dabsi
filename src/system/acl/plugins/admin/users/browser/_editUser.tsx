import { MuiDataInputMapView } from "@dabsi/browser/mui/rpc/inputs/MuiDataInputMapView";
import { MuiEditFormView } from "@dabsi/browser/mui/rpc/MuiEditFormView";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import AclAdminViewWrappers from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewWrappers";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import AclUserBasicInfoInput from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoInput";
import AclUserGroupsForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserGroupsForm";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { MuiAccordionMapView } from "@dabsi/system/rpc/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/system/rpc/browser/MuiGridMapView";
import { useSystemViewTheme } from "@dabsi/system/rpc/view/useSystemViewTheme";
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
        <AclAdminViewWrappers.UserBasicInfo>
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
        </AclAdminViewWrappers.UserBasicInfo>
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
        <MuiAccordionMapView for={props} />
      </MuiSystemPage>
    );
  }
);
