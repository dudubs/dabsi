import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { MuiDataInputView } from "../../browser/mui/rpc/inputs/MuiDataInputView";
import { MuiFormView } from "../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../lang/Lang";
import { EmptyFragment } from "../../react/utils/EmptyFragment";
import { WidgetRouterView } from "../../typerpc/widget/WidgetRouterView";
import { MuiAdminView } from "../common/admin/MuiAdminView";
import { SystemApp } from "../common/SystemApp";
import { SystemRouter } from "./SystemRouter";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export function MuiSystemView(router: typeof SystemRouter) {
  MuiAdminView(router.at("admin"));
  WidgetRouterView(router.at("login"), SystemApp.service.devLogin, props => {
    const classes = useStyles();
    return (
      <>
        <Grid container justify={"center"}>
          <Grid item>
            <Paper className={classes.paper}>
              <MuiFormView
                {...props}
                input={props => (
                  <>
                    <MuiDataInputView {...props} title={Lang`LOGIN_TO_USER`} />
                  </>
                )}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  });
}
