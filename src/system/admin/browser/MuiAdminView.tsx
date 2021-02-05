import { MuiButtonMenu } from "@dabsi/browser/mui/components/MuiButtonMenu";
import { MuiNestedMenu } from "@dabsi/browser/mui/nested-menu";
import { useEmitted } from "@dabsi/react/reactor/useEmitted";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { Store } from "@dabsi/store";
import { AclConnection } from "@dabsi/system/acl/common/AclRpc";
import AclLoginInfoEvent from "@dabsi/system/acl/common/AclLoginInfoEvent";
import AclLoginRouter from "@dabsi/system/acl/common/AclLoginRouter";
import { MuiAdminMenu } from "@dabsi/system/admin/browser/menu";
import { AdminInfoEvent } from "@dabsi/system/admin/browser/router";
import MuiRouterLink from "@dabsi/system/admin/browser/MuiRouterLink";
import { MuiTemplate } from "@dabsi/system/admin/browser/MuiTemplate";
import { PaperInCenter } from "@dabsi/system/admin/browser/PaperInCenter";
import { getAdminInfo } from "@dabsi/system/admin/common";
import { useRoute } from "@dabsi/typerouter/ReactRouter";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ReactElement, ReactNode } from "react";

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
  const route = useRoute();
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
            onChildClick={path => {
              const { child } = path;
              // store.set("open", false);
              child.router && route.location.find(child.router)!.push();
            }}
          />
        </>
      }
      toolbarMenu={
        <MuiButtonMenu
          iconOnly
          icon={require("@material-ui/icons/AccountCircle")}
          color={"inherit"}
        >
          <MenuItem
            onClick={() => {
              AclConnection.logout();
              emit(AclLoginInfoEvent, { type: "logout" });
            }}
          >
            Logout
          </MenuItem>
        </MuiButtonMenu>
      }
    >
      {children}
    </MuiTemplate>
  );
}
