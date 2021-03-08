import { MuiDataInputMapView } from "@dabsi/browser/mui/widget/input/MuiDataInputMapView";
import { MuiEditFormView } from "@dabsi/browser/mui/widget/MuiEditFormView";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { AclAdminUserBasicInfoInput } from "@dabsi/system/acl/plugins/admin/users/common/basicInfoInput";
import { AclAdminUserGroupsForm } from "@dabsi/system/acl/plugins/admin/users/common/groupsForm";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { Form } from "@dabsi/typerpc/widget/form/rpc";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import React, { useState } from "react";

RouterView.define(AclAdminRouter.at("editUser"), ({ location }) => {
  const [title, setTitle] = useState("");

  SystemView.use(define => {
    function updateTitle({ firstName = "", lastName = "" } = {}) {
      setTitle(`${firstName} ${lastName}`);
    }

    define(Form, MuiEditFormView);

    define(AclAdminUserBasicInfoInput, props => (
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

    define(AclAdminUserGroupsForm.at("input"), props => (
      <MuiDataInputMapView {...props} itemGridProps={{ xs: 4 }} />
    ));
  });

  return (
    <WidgetLoaderView
      connection={() =>
        AclAdminConnection.usersManager.edit(location.params.userId)
      }
    >
      {props => (
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
      )}
    </WidgetLoaderView>
  );
});
