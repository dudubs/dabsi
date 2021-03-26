import { MuiDataInputMapView } from "@dabsi/browser/mui/input/DataInputMap";
import { MuiEditFormView } from "@dabsi/browser/mui/widget/EditFormView";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import { ACL_Admin_Browser_Breadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/breadcrumbs";
import { ACL_Admin_Connection } from "@dabsi/system/acl/plugins/admin/common/rpc";
import { ACL_Admin_UserBaiscInfoInput } from "@dabsi/system/acl/plugins/admin/users/common/basicInfoInput";
import { ACL_Admin_UserGroupsForm } from "@dabsi/system/acl/plugins/admin/users/common/groupsForm";
import { ACL_AdminRouter } from "@dabsi/system/acl/plugins/admin/view/router";
import { MuiAccordionMapView } from "@dabsi/system/core/browser/MuiAccordionMapView";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import { MuiPage } from "@dabsi/browser/mui/MuiPage";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import { Form } from "@dabsi/typerpc/widget/form/rpc";
import { WidgetViewLoader } from "@dabsi/typerpc/widget/view/loader";
import { mergeProps } from "@dabsi/view/react/merging/mergeProps";
import React, { useState } from "react";

RouterView.define(ACL_AdminRouter.at("editUser"), ({ location }) => {
  const [title, setTitle] = useState("");

  SystemView.use(define => {
    function updateTitle({ firstName = "", lastName = "" } = {}) {
      setTitle(`${firstName} ${lastName}`);
    }

    define(Form, MuiEditFormView);

    define(ACL_Admin_UserBaiscInfoInput, props => (
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

    define(ACL_Admin_UserGroupsForm.at("input"), props => (
      <MuiDataInputMapView {...props} itemGridProps={{ xs: 4 }} />
    ));
  });

  return (
    <WidgetViewLoader
      connection={() =>
        ACL_Admin_Connection.usersManager.edit(location.params.userId)
      }
    >
      {props => (
        <MuiPage
          title={lang`EDIT_USER`}
          breadcrumbTitle={title}
          Breadcrumbs={ACL_Admin_Browser_Breadcrumbs.Users}
        >
          <MuiAccordionMapView
            for={props}
            exclude={AclAdminViewOptions.editUser.excludeChildKeys}
            wrappers={AclAdminViewOptions.editUser.childWrapperMap}
          />
        </MuiPage>
      )}
    </WidgetViewLoader>
  );
});
