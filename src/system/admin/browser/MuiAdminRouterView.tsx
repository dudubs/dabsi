import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import * as React from "react";
import { MuiButton } from "../../../browser/mui/components/MuiButton";
import { MuiNestedMenu } from "../../../browser/mui/MuiNestedMenu";
import { MuiSystem } from "../../../browser/mui/MuiSystem";
import { Lang } from "../../../lang/Lang";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { LoginInfoEvent } from "../../../system-old/browser/LoginInfoEvent";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { AdminRouter } from "../common";
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

function MuiAdminView({ children }) {
  const classes = useStyles();
  const [isMenuOpen, setMenu] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <MuiButton
            iconOnly
            icon={require("@material-ui/icons/Menu")}
            edge={"start"}
            color="inherit"
            onClick={() => {
              setMenu(true);
            }}
          />
          <Typography>{Lang`ADMIN`}</Typography>
        </Toolbar>{" "}
        <Drawer open={isMenuOpen} keepMounted onClose={() => setMenu(false)}>
          <div className={classes.drawer}>hello</div>
        </Drawer>
      </AppBar>
      <div className={classes.container}>
        <Typography>hello admin</Typography>
        {children}
      </div>
    </div>
  );
}
