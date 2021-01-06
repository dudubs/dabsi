import MuiAvatarInput from "@dabsi/system/acl-user-avatar/browser/MuiAvatarInput";
import AclEditUserAvatarRpc from "@dabsi/system/acl-user-avatar/common/AclEditUserAvatarRpc";
import AclEditUserAvatar from "@dabsi/system/acl-user-avatar/plugins/admin/common/AclAdminEditUserAvatarRpc";
import AclAdminViewOptions from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewOptions";
import AclAdminEditUser from "@dabsi/system/acl/plugins/admin/users/common/AclAdminEditUser";
import AclUserBasicInfoForm from "@dabsi/system/acl/plugins/admin/users/common/AclUserBasicInfoForm";
import processRpcWithFormData from "@dabsi/system/core/browser/processRpcWithFormData";
import { WidgetNamespaceView } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamespaceView";
import Grid from "@material-ui/core/Grid";
import React from "react";

const childKey = AclAdminEditUser.getChildKey(AclEditUserAvatar)!;

AclAdminViewOptions.editUser.excludeChildKeys.push(
  AclAdminEditUser.definedChildKey(AclEditUserAvatar)
);

AclAdminViewOptions.editUser.childWrapperMap[
  AclAdminEditUser.definedChildKey(AclUserBasicInfoForm)
] = children => <View>{children}</View>;

function View({ children }) {
  const props = WidgetNamespaceView.useViewProps(AclEditUserAvatarRpc);

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
            url={props.element.currentUrl}
            onChange={async canvas => {
              const blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                  blob => {
                    if (blob) {
                      resolve(blob);
                      return;
                    }
                    throw new Error("No blob");
                  },
                  "image/png",
                  1
                );
              });
              const result = await processRpcWithFormData(
                df => {
                  df.append("avatar", blob, "avatar.png");
                },
                () => props.connection.controller.update({ field: "avatar" })
              );
              console.log({ result });
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
