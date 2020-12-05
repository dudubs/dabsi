import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { MuiButtonMenu } from "../../../browser/mui/components/MuiButtonMenu";
import { MuiLink } from "../../../browser/mui/components/MuiLink";
import { MuiNestedMenu } from "../../../browser/mui/MuiNestedMenu";
import { Lang } from "../../../lang/Lang";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useStore } from "../../../react/useStore";
import { WithStore } from "../../../Store";
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
import { MuiTemplate, useStyles } from "./MuiTemplate";
import { PaperInCenter } from "./PaperInCenter";

export class MuiAdminViewState {
  open = true;
}

export function MuiAdminView(
  props: { children?: ReactNode } & WithStore<MuiAdminViewState>
): ReactElement {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { state, store } = useStore(props, MuiAdminViewState);

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
