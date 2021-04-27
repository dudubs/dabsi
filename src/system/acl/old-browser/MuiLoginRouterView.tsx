import { MuiFormView } from "@dabsi/browser/mui/form/view";
import { MuiTextInputView } from "@dabsi/browser/mui/input/TextInput";
import { AclLoginInfoEvent } from "@dabsi/system/acl/old-common/loginInfoEvent";
import { AclLoginRouter } from "@dabsi/system/acl/old-common/router";
import { AclConnection, AclRpc } from "@dabsi/system/acl/old-common/rpc";
import { PaperInCenter } from "@dabsi/system/admin/browser/PaperInCenter";
import { SystemView } from "@dabsi/system/core/old-view/SystemView";
import { useHistory } from "@dabsi/typerouter/History";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetViewLoader } from "@dabsi/old-typerpc/widget/view/loader";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import Typography from "@material-ui/core/Typography";
import React from "react";

SystemView.define(AclRpc.at(`login.input.map.password`), props => (
  <MuiTextInputView
    {...props}
    title={lang`PASSWORD`}
    TextFieldProps={{
      type: "password",
    }}
  />
));

RouterView.define(AclLoginRouter, () => {
  const emit = useEmitter();
  const history = useHistory();

  return (
    <WidgetViewLoader connection={AclConnection.login}>
      {props => {
        return (
          <PaperInCenter>
            <Typography variant={"h6"}>{lang`LOGIN`}</Typography>
            <MuiFormView
              {...props}
              onSubmit={result => {
                if (result.type !== "success") return;
                console.log({ result });
                emit(AclLoginInfoEvent, result);

                const redirectionData = history.location.search.match(
                  /[?&]redirection=(?<x>[^&$]+)/
                )?.groups?.x;

                const redirection =
                  redirectionData &&
                  JSON.parse(decodeURIComponent(redirectionData));

                if (redirection?.type === "location") {
                  history.push(redirection.path);
                }
              }}
            />
          </PaperInCenter>
        );
      }}
    </WidgetViewLoader>
  );
});
