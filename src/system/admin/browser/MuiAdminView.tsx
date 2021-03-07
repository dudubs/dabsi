import { MuiNestedMenu } from "@dabsi/browser/mui/nested-menu";
import MuiAnchor from "@dabsi/browser/MuiAnchor";
import { Store } from "@dabsi/store";
import { AclLoginInfoEvent } from "@dabsi/system/acl/common/loginInfoEvent";
import { AclLoginRouter } from "@dabsi/system/acl/common/router";
import { AclConnection } from "@dabsi/system/acl/common/rpc";
import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import { MuiTemplate } from "@dabsi/system/admin/browser/MuiTemplate";
import { PaperInCenter } from "@dabsi/system/admin/browser/PaperInCenter";
import { AdminInfoEvent } from "@dabsi/system/admin/browser/router";
import { getAdminInfo } from "@dabsi/system/admin/common";
import { RouterViewEvent } from "@dabsi/typerouter/event";
import { useEmitted } from "@dabsi/view/react/reactor/useEmitted";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React, { ReactElement, ReactNode } from "react";

export class MuiAdminViewState {
  open = true;
}

export function MuiAdminView(props: {
  children?: ReactNode;
  store?: Store<MuiAdminViewState>;
}): ReactElement {
  const { children } = props;

  const adminInfo = useEmitted(AdminInfoEvent, adminInfo => {
    // console.log(adminInfo);
  });

  const loginInfo = useEmitted(AclLoginInfoEvent, async loginInfo => {
    // console.log({ loginInfoType: loginInfo.type });
    if (loginInfo.type === "success") {
      emit(AdminInfoEvent, await getAdminInfo());
    } else {
    }
  });

  const emit = useEmitter();

  // useRouterLocation

  if (loginInfo.type !== "success")
    return (
      <PaperInCenter title={lang`ACCESS_DENIED`}>
        <Typography>
          <MuiRouterLink
            router={() => AclLoginRouter}
          >{lang`LOGIN`}</MuiRouterLink>
        </Typography>
      </PaperInCenter>
    );

  return (
    <MuiTemplate
      title={lang`ADMIN`}
      drawerMenu={
        <>
          <MuiNestedMenu
            children={MuiAdminMenu.children}
            getChildren={child => child.children || {}}
            getChildIcon={child => child.icon}
            getChildTitle={child => child.title}
            onChildClick={({ child: { router } }) => {
              emit(RouterViewEvent, {
                type: "push",
                router,
              });
            }}
          />
        </>
      }
      toolbarMenu={
        <MuiAnchor>
          {({ menuProps, buttonProps }) => (
            <>
              <IconButton {...buttonProps} color="inherit">
                <AccountCircleIcon />
              </IconButton>{" "}
              <Menu {...menuProps}>
                <MenuItem
                  onClick={() => {
                    AclConnection.logout();
                    emit(AclLoginInfoEvent, { type: "logout" });
                  }}
                >
                  {lang`LOGOUT`}
                </MenuItem>
              </Menu>
            </>
          )}
        </MuiAnchor>
      }
    >
      {children}
    </MuiTemplate>
  );
}
