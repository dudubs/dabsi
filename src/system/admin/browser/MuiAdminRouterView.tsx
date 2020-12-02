import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { ReactElement, useState } from "react";
import { MuiButton } from "../../../browser/mui/components/MuiButton";
import { MuiButtonMenu } from "../../../browser/mui/components/MuiButtonMenu";
import { MuiLink } from "../../../browser/mui/components/MuiLink";
import { Lang } from "../../../lang/Lang";
import { Emittable } from "../../../react/reactor/Reactor";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useRoute } from "../../../typerouter/ReactRouter";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { RouterEvent } from "../../../typerouter/RouterEvent";
import {
  AclConnection,
  AclLoginRouter,
  LoginInfoEvent,
} from "../../acl/common";
import { AdminInfo, AdminRouter, getAdminInfo } from "../common";
import { MuiAdminMenuView } from "./MuiAdminMenuView";
import { PaperInCenter } from "./PaperInCenter";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  drawer: {
    minWidth: 250,
  },
  root: {},
  title: {
    flexGrow: 1,
  },
  "@global": {
    body: {
      margin: 0,
    },
  },
}));

ReactRouterView(AdminRouter, {
  wrap: ({ children }) => {
    return <MuiAdminView>{children}</MuiAdminView>;
  },
});

export const AdminInfoEvent = Emittable<AdminInfo>();

function MuiAdminView({ children }): ReactElement {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(true);

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
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <MuiButton
            IconButtonProps={{ edge: "start" }}
            iconOnly
            icon={require("@material-ui/icons/Menu")}
            edge={"start"}
            color="inherit"
            onClick={() => {
              setMenuOpen(true);
            }}
          />
          <Typography className={classes.title}>{Lang`ADMIN`}</Typography>{" "}
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
        </Toolbar>
        <Drawer open={menuOpen} keepMounted onClose={() => setMenuOpen(false)}>
          <MuiAdminMenuView />
        </Drawer>
      </AppBar>
      <div className={classes.container}>
        <Typography>hello {loginInfo.fullName}</Typography>
        {children}
      </div>
    </div>
  );
}
