import AclAdminViewWrappers from "@dabsi/system/acl/plugins/admin/browser/AclAdminViewWrappers";
import MuiUserAvatarInputView from "@dabsi/system/acl-user-avatar/browser/MuiUserAvatarInputView";
import Grid from "@material-ui/core/Grid";
import React from "react";

AclAdminViewWrappers.UserBasicInfo.push(children => {
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
});
