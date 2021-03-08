import { MuiTextInputView } from "@dabsi/browser/mui/widget/input/MuiTextInputView";
import { MuiFormView } from "@dabsi/browser/mui/widget/MuiFormView";
import { AclLoginInfoEvent } from "@dabsi/system/acl/common/loginInfoEvent";
import { AclLoginRouter } from "@dabsi/system/acl/common/router";
import { AclConnection } from "@dabsi/system/acl/common/rpc";
import { PaperInCenter } from "@dabsi/system/admin/browser/PaperInCenter";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { useHistory } from "@dabsi/typerouter/History";
import { RouterView } from "@dabsi/typerouter/view";
import { WidgetLoaderView } from "@dabsi/typerpc/widget/WidgetLoaderView";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import Typography from "@material-ui/core/Typography";
import React from "react";

RouterView.define(AclLoginRouter, () => {
  const emit = useEmitter();
  const history = useHistory();

  SystemView.use(AclConnection.login.input.map.password.$widget, props => (
    <MuiTextInputView
      {...props}
      title={lang`PASSWORD`}
      TextFieldProps={{
        type: "password",
      }}
    />
  ));

  return (
    <WidgetLoaderView connection={AclConnection.login}>
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
    </WidgetLoaderView>
  );
});
