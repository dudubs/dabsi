import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { SystemView } from "../../core/common/SystemView";
import { AclAdminRouter } from "../common";
import { AclAdminConnection, AclEditUserWidget } from "../common/AclAdminRpc";
import { AclEditUserWidgetView } from "./AclEditUserWidgetView";
import { AclGroupsWidgetView } from "./AclGroupsWidgetView";
import { MuiUserBasicInfoInputView } from "./MuiUserBasicInfoInputView";

AclEditUserWidget.at("map", $ => {
  $.at("groups").at("input", $ => {
    // SystemView.register($, props => (
    //   <MuiDataInputMapView {...props} noKeysText={Lang`NO_GROUPS`} />
    // ));
  });
});

SystemView
  // user inputs
  .register(UserBasicInfoInput, MuiUserBasicInfoInputView);

WidgetRouterView(
  AclAdminRouter.at("editUser"),
  params => AclAdminConnection.editUser(params.userId),
  AclEditUserWidgetView
);

WidgetRouterView(
  AclAdminRouter.at("groups"),
  () => AclAdminConnection.groups,
  AclGroupsWidgetView
);
