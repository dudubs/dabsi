import MuiActions from "@dabsi/browser/mui/MuiActions";
import { mapObject } from "@dabsi/common/object/mapObject";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclCurrentUserReactor } from "@dabsi/system/acl/view";
import MuiSiteToolbarMenu from "@dabsi/system/site/browser/MuiSiteToolbarMenu";
import MuiSiteUserMenu from "@dabsi/system/site/browser/MuiSiteUserMenu";
import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import mergeProps from "@dabsi/view/react/mergeProps";
import ViewContext from "@dabsi/view/react/ViewContext";
import { Grid, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";

const HELLO_NAME = lang`HELLO_${"name"}`;

MuiSiteToolbarMenu.push(() => {
  const currentUser = AclCurrentUserReactor.use();

  const context = ViewContext.use();
  const navigator = ViewContext.get(context, RouterViewNavigator);

  const actions = mapObject(MuiSiteUserMenu.customActions, customAction =>
    typeof customAction === "function"
      ? customAction({ navigator, context })
      : customAction
  );

  actions.logout = mergeProps(actions.logout, {
    async onAction() {
      await AclRpc.instance.logout();
      AclCurrentUserReactor.emit(null);
    },
  });

  return (
    <>
      {currentUser && (
        <Grid container alignItems="center">
          <Grid item>
            <Typography color="inherit" variant="subtitle2">
              {HELLO_NAME({ name: currentUser.displayName })}
            </Typography>
          </Grid>
          <Grid item>
            <MuiActions
              IconButtonProps={{ color: "inherit" }}
              defaultAction={{ type: "menu" }}
              menuAction={{
                icon: <AccountCircleIcon />,
                tooltip: lang`USER_MENU`,
              }}
              actions={actions}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
});
