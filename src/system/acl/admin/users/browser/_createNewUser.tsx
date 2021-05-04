import { MuiFormView } from "@dabsi/browser/mui/form/MuiFormView";
import { ACL_Admin_Browser_Breadcrumbs } from "@dabsi/system/acl/admin/browser/breadcrumbs";
import { ACL_Admin_Connection } from "@dabsi/system/acl/admin/common/rpc";
import { MuiGridMapView } from "@dabsi/system/core/old-browser/MuiGridMapView";
import { MuiPage } from "@dabsi/core/browser/mui/page";
import { SystemView } from "@dabsi/system/core/old-view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";

const connection = ACL_Admin_Connection.usersManager.add;

RouterView.define(
  ACL_AdminRouter.at("createNewUser"),
  (props, { location }) => {
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
      <WidgetViewLoader connection={ACL_Admin_Connection.usersManager.add}>
        {props => (
          <MuiPage
            title={lang`CREATE_NEW_USER`}
            Breadcrumbs={ACL_Admin_Browser_Breadcrumbs.Users}
          >
            <SystemView {...props} />
          </MuiPage>
        )}
      </WidgetViewLoader>
    );
  }
);
