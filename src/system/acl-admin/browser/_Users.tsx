import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { SystemView } from "../../view/SystemView";
import AclAdminRouter from "../common/AclAdminRouter";
import { AclAdminConnection, AclEditUserWidget } from "../common/AclAdminRpc";
import AclEditUserWidgetView from "./AclEditUserWidgetView";
import { AclUserBasicInfoInputView } from "./AclUserBasicInfoInputView";

AclEditUserWidget.at("map", $ => {
  $.at("groups").at("input", $ => {
    // SystemView.register($, props => (
    //   <MuiDataInputMapView {...props} noKeysText={Lang`NO_GROUPS`} />
    // ));
  });
});

SystemView
  // user inputs
  .register(UserBasicInfoInput, AclUserBasicInfoInputView);

WidgetRouterView(
  AclAdminRouter.at("editUser"),
  params => AclAdminConnection.editUser(params.userId),
  AclEditUserWidgetView
);
