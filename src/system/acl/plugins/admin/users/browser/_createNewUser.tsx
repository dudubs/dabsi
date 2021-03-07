import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { AclBreadcrumbs } from "@dabsi/system/acl/plugins/admin/browser/AclBreadcrumbs";
import AclAdminRouter from "@dabsi/system/acl/plugins/admin/common/AclAdminRouter";
import { AclAdminConnection } from "@dabsi/system/acl/plugins/admin/common/AclAdminRpc";
import { MuiGridMapView } from "@dabsi/system/core/browser/MuiGridMapView";
import MuiSystemPage from "@dabsi/system/core/browser/MuiSystemPage";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";

WidgetRouterView.define(
  AclAdminRouter.at("createNewUser"),
  AclAdminConnection.usersManager.add,
  (props, { location }) => {
    SystemView.use(props.connection.$widget, props => (
      <MuiFormView
        {...props}
        onSubmit={() => location.parent.at("users").push()}
      />
    ));

    SystemView.use(props.connection.input.$widget, props => (
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
      <MuiSystemPage
        title={lang`CREATE_NEW_USER`}
        Breadcrumbs={AclBreadcrumbs.Users}
      >
        <SystemView {...props} />
      </MuiSystemPage>
    );
  }
);
