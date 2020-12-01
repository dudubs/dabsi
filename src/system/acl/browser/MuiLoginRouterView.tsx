import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { MuiSystem } from "../../../browser/mui/MuiSystem";
import { Lang } from "../../../lang/Lang";
import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { WidgetViewLoader } from "../../../typerpc/widget/WidgetViewLoader";
import { AclConnection, AclLoginRouter } from "../common";
import { MuiAclLoginFormView } from "./MuiAclLoginFormView";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

WidgetRouterView(AclLoginRouter, AclConnection.login, props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant={"h6"}>{Lang`LOGIN`}</Typography>
        <MuiAclLoginFormView {...props} />
      </Paper>
    </div>
  );
});
