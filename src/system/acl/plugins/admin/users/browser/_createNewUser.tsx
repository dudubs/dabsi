import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { SystemView } from "@dabsi/system/core/view/SystemView";

import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";

const connection = AclAdminConnection.usersManager.add;

RouterView.define(AclAdminRouter.at("createNewUser"), (props, { location }) => {
  SystemView.use(connection.$widget, props => (
    <MuiFormView
      {...props}
      onSubmit={() => location.parent.at("users").push()}
    />
  ));

  SystemView.use(connection.input.$widget, props => (
    <MuiGridMapView
      for={props}
      children={{
        firstName: {
          GridProps: { xs: 6 },
        },
        lastName: {
          GridProps: { xs: 6 },
        },
      }}
    />
  ));

  return (
    <WidgetLoaderView connection={AclAdminConnection.usersManager.add}>
      {props => (
        <MuiSystemPage
          title={lang`CREATE_NEW_USER`}
          Breadcrumbs={AclBreadcrumbs.Users}
        >
          <SystemView {...props} />
        </MuiSystemPage>
      )}
    </WidgetLoaderView>
  );
});
