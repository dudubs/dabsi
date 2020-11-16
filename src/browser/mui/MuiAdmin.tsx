import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Lang } from "../../lang/Lang";
import { MuiButton } from "./components/MuiButton";
import {
  MuiNestedMenuChild,
  MuiNestedMenuProps,
  MuiNestedMenu,
} from "./MuiNestedMenu";

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

export type MuiAdminProps = {
  children?;
  menu?: Record<string, MuiNestedMenuProps>;
};

export function MuiAdmin({ children, menu }: MuiAdminProps) {
  const classes = useStyles();
  const [isMenuOpen, setMenu] = useState(true);

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
          <div className={classes.drawer}>
            <MuiNestedMenu children={menu||{}}  />
          </div>
        </Drawer>
      </AppBar>
      <div className={classes.container}>{children}</div>
    </div>
  );
}
