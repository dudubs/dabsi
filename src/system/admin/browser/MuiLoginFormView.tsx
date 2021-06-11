import FacebookIcon from "@material-ui/icons/Facebook";
import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import styled from "styled-components";

const StyledPapaer = styled(Paper)`
  ${p => p.theme.breakpoints.up("sm")} {
    padding: ${p => p.theme.spacing(4)}px ${p => p.theme.spacing(8)}px;

    margin: auto;
    margin-top: 10%;
    max-width: 500px;
  }

  ${p => p.theme.breakpoints.only("xs")} {
    padding: ${p => p.theme.spacing(2)}px ${p => p.theme.spacing(4)}px;
  }
`;
export function MuiLoginFormView({
  onLogin,
}: {
  onLogin(p: { fullName?: string; loginName: string });
}) {
  return (
    <StyledPapaer>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        color="textSecondary"
      >{lang`LOGIN_TO_SYSTEM`}</Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justify="center"
      >
        <Grid item xs>
          <MuiFormView
            connection={AclRpc.instance.login}
            renderHeader={({ value, input }) => {
              switch (value?.type) {
                case "failed":
                  return (
                    <Alert severity="error">{lang`LOGIN_IS_FAILED`}</Alert>
                  );
                case "success":
                  return (
                    <Alert severity="success">
                      {lang`LOGIN_IS_SUCCESSFULY`},
                      {lang`HELLO_${"name"}`({
                        name: value.fullName || input.value?.loginName,
                      })}
                    </Alert>
                  );
              }
            }}
            MuiFormProps={{
              disableReset: true,
              submitTitle: lang`LOGIN`,
              ButtonProps: { color: "primary", variant: "contained" },
              ButtonsContainerProps: { justify: "flex-start" },
              SubmitButtonProps: { endIcon: <ExitToAppIcon /> },
            }}
            onSubmit={(result, { input }) => {
              if (result.type === "success") {
                setTimeout(() => {
                  onLogin({
                    loginName: input.value?.loginName!,
                    fullName: result.fullName,
                  });
                }, 1000);
              }
            }}
          />
        </Grid>
        <Grid item>
          <LoginWithGoogleButton startIcon={<FacebookIcon />}>
            LOGIN_WITH_GOOGLE
          </LoginWithGoogleButton>
        </Grid>
      </Grid>
    </StyledPapaer>
  );
}

const LoginWithGoogleButton = styled(Button)`
  &&& {
    background-color: red;
    color: white;
  }
`;
