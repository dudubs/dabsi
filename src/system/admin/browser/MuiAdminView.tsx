import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { MuiButtonMenu } from "../../../browser/mui/components/MuiButtonMenu";
import { MuiLink } from "../../../browser/mui/components/MuiLink";
import { MuiNestedMenu } from "../../../browser/mui/nested-menu";
import { Lang } from "../../../lang/Lang";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { Store } from "../../../store";
import { useRoute } from "../../../typerouter/ReactRouter";
import { RouterEvent } from "../../../typerouter/RouterEvent";
import {
  AclConnection,
  AclLoginRouter,
  LoginInfoEvent,
} from "../../acl/common";
import { getAdminInfo } from "../common";
import { MuiAdminMenu } from "./MuiAdminMenu";
import { AdminInfoEvent } from "./MuiAdminRouterView";
import { MuiTemplate } from "./MuiTemplate";
import { PaperInCenter } from "./PaperInCenter";

export class MuiAdminViewState {
  open = true;
}

export function MuiAdminView(props: {
  children?: ReactNode;
  store?: Store<MuiAdminViewState>;
}): ReactElement {
  const { children } = props;

  const adminInfo = useEmitted(AdminInfoEvent, adminInfo => {
    console.log(adminInfo);
  });

  const loginInfo = useEmitted(LoginInfoEvent, async loginInfo => {
    console.log({ loginInfoType: loginInfo.type });
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
      <PaperInCenter title={Lang`ACCESS_DENIED`}>
        <Typography>
          <MuiLink
            href={"#"}
            onClick={e => {
              e.preventDefault();
              emit(RouterEvent, {
                type: "push",
                location: route.location.find(AclLoginRouter)!,
                redirection: { type: "location", location: route.location },
              });
            }}
          >{Lang`LOGIN`}</MuiLink>
        </Typography>
      </PaperInCenter>
    );

  return (
    <MuiTemplate
      title={Lang`ADMIN`}
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
              emit(LoginInfoEvent, { type: "logout" });
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
