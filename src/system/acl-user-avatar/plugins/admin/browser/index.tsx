import { canvasToBlob } from "@dabsi/browser/ImageUtils";
import MuiAvatarInput from "@dabsi/system/acl-user-avatar/browser/MuiAvatarInput";
import AclEditUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
import AclEditUserAvatar from "@dabsi/system/acl-user-avatar/plugins/admin/common/AclAdminEditUserAvatarRpc";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import AclAdminEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclAdminEditUser";
import AclAdminUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclAdminUserBasicInfoForm";
import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import { WidgetNamespaceView } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamespaceView";
import Grid from "@material-ui/core/Grid";
import React, { useState } from "react";

const childKey = AclAdminEditUser.getChildKey(AclEditUserAvatar)!;

AclAdminViewOptions.editUser.excludeChildKeys.push(
  AclAdminEditUser.definedChildKey(AclEditUserAvatar)
);

AclAdminViewOptions.editUser.childWrapperMap[
  AclAdminEditUser.definedChildKey(AclAdminUserBasicInfoForm)
] = children => <View>{children}</View>;

function View({ children }) {
  const props = WidgetNamespaceView.useViewProps(AclEditUserAvatarRpc);

  const [url, setUrl] = useState(() => props.element.currentUrl);

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
          <MuiAvatarInput
            url={url}
            onChange={async canvas => {
              const blob = await canvasToBlob(canvas);
              const result = await processRpcWithFormData(
                df => {
                  df.append("avatar", blob);
                },
                () => props.connection.controller.update({ field: "avatar" })
              );
              setUrl(result.url);
            }}
          />
        </Grid>
        <Grid sm={12} md={6} item>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
