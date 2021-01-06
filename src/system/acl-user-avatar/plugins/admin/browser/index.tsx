import MuiUserAvatarInputView from "@dabsi/system/acl-user-avatar/browser/MuiUserAvatarInputView";
import AclEditUserAvatar from "@dabsi/system/acl-user-avatar/plugins/admin/common/AclEditUserAvatar";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import AclEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclEditUser";
import AclUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoForm";
import { WidgetNamespaceView } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamespaceView";
import Grid from "@material-ui/core/Grid";
import React from "react";

const childKey = AclEditUser.getChildKey(AclEditUserAvatar)!;

AclAdminViewOptions.editUser.excludeChildKeys.push(
  AclEditUser.definedChildKey(AclEditUserAvatar)
);

AclAdminViewOptions.editUser.childWrapperMap[
  AclEditUser.definedChildKey(AclUserBasicInfoForm)
] = children => <View>{children}</View>;

function View({ children }) {
  const props = WidgetNamespaceView.useViewProps(AclEditUserAvatar);

  return (
    <>
      <Grid
        container
        spacing={3}
        direction="row-reverse"
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid sm={12} md={6} item>
          <MuiUserAvatarInputView />
        </Grid>
        <Grid sm={12} md={6} item>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
