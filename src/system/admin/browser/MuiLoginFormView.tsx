import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import { MuiObjectInputView } from "@dabsi/browser/mui/views/MuiObjectInputView";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Alert from "@material-ui/lab/Alert";
import React from "react";

export function MuiLoginFormView({
  onLogin,
}: {
  onLogin(p: { fullName?: string; loginName: string });
}) {
  return (
    <>
      <Typography variant="h5" gutterBottom>{lang`LOGIN_TO_SYSTEM`}</Typography>
      <SystemView
        connection={AclRpc.instance.login}
        stylesheet={{
          input: [
            props => (
              <MuiObjectInputView
                {...props}
                item={{
                  loginName: { xs: true },
                }}
              />
            ),
          ],
        }}
      >
        {props => (
          <MuiFormView
            {...props}
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
              baseButtonProps: { color: "primary", variant: "text" },
              buttonsGridProps: { justify: "center" },
              submitButtonProps: { endIcon: <ExitToAppIcon /> },
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
        )}
      </SystemView>
    </>
  );
}
