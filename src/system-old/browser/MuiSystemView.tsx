import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { MuiDataInputView } from "../../browser/mui/rpc/inputs/MuiDataInputView";
import { MuiFormView } from "../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../lang/Lang";
import { useEmittedState } from "../../react/reactor/useEmittedState";
import { WidgetRouterView } from "../../typerpc/widget/WidgetRouterView";
import { SystemApp } from "../common/SystemApp";
import { LoginInfoEvent } from "./LoginInfoEvent";
import { MuiAdminView } from "./MuiAdminView";
import { SystemRouter } from "./SystemRouter";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export function MuiSystemView(router: typeof SystemRouter) {
  MuiAdminView(router.at("admin"));
  WidgetRouterView(
    router.at("login"),
    SystemApp.service.devLogin,
    (props, { emit }) => {
      const classes = useStyles();
      const loginInfo = useEmittedState(LoginInfoEvent);

      return (
        <>
          <Grid container justify={"center"}>
            <Grid item>
              {loginInfo?.success && (
                <Typography>
                  {Lang`WELCOME_TO_${"fullName"}`({
                    fullName: loginInfo.success.fullName,
                  })}
                </Typography>
              )}
              <Paper className={classes.paper}>
                <MuiFormView
                  {...props}
                  onSubmit={loginInfo => {
                    emit(new LoginInfoEvent(loginInfo));
                  }}
                  input={props => (
                    <>
                      <MuiDataInputView
                        {...props}
                        title={Lang`USER_TO_LOGIN`}
                      />
                    </>
                  )}
                />
              </Paper>
            </Grid>
          </Grid>
        </>
      );
    }
  );
}
