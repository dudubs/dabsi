import MuiFormView from "@dabsi/browser/mui/views/MuiFormView";
import { WeakId } from "@dabsi/common/WeakId";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclCurrentUserReactor } from "@dabsi/system/acl/view";
import { Grid, Paper, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import styled from "styled-components";

export const MuiLoginButtons: React.ComponentType[] = [];

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
export function MuiLoginFormView(p: {}) {
  return (
    <StyledPapaer>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        color="textSecondary"
      >{lang`LOGIN_TO_SYSTEM`}</Typography>
      <Grid container direction="column" spacing={3} justify="center">
        <Grid item xs>
          <MuiFormView
            connection={AclRpc.instance.loginForm}
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
                        name: value.user.displayName,
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
              SubmitButtonProps: {
                endIcon: <ExitToAppIcon />,
                fullWidth: true,
              },
              renderButtons: p => p.submitButton,
            }}
            onSubmit={(result, { input }) => {
              if (result.type === "success") {
                AclCurrentUserReactor.emit(result.user);
              }
            }}
          />
        </Grid>
        {!MuiLoginButtons.length ? null : (
          <Grid item container spacing={1} justify="center">
            {MuiLoginButtons.map(Button => (
              <Grid item key={WeakId(Button)}>
                <Button />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </StyledPapaer>
  );
}
