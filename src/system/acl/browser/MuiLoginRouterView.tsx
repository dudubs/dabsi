import { MuiTextInputView } from "@dabsi/browser/mui/rpc/inputs/MuiTextInputView";
import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { AclConnection } from "@dabsi/system/acl/AclRpc";
import AclLoginInfoEvent from "@dabsi/system/acl/common/AclLoginInfoEvent";
import AclLoginRouter from "@dabsi/system/acl/common/AclLoginRouter";
import { PaperInCenter } from "@dabsi/system/admin/browser/PaperInCenter";
import { useSystemView } from "@dabsi/system/rpc/view/useSystemView";
import { useReactRouter } from "@dabsi/typerouter/ReactRouter";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import Typography from "@material-ui/core/Typography";
import React from "react";

WidgetRouterView(AclLoginRouter, AclConnection.login, props => {
  const emit = useEmitter();
  const reactRouter = useReactRouter();

  useSystemView(props.connection.input.map.password.$widget, props => (
    <MuiTextInputView
      {...props}
      title={lang`PASSWORD`}
      TextFieldProps={{
        type: "password",
      }}
    />
  ));

  return (
    <PaperInCenter>
      <Typography variant={"h6"}>{lang`LOGIN`}</Typography>
      <MuiFormView
        {...props}
        onSubmit={result => {
          if (result.type !== "success") return;
          console.log({ result });
          emit(AclLoginInfoEvent, result);

          const redirectionData = reactRouter.history.location.search.match(
            /[?&]redirection=(?<x>[^&$]+)/
          )?.groups?.x;

          const redirection =
            redirectionData && JSON.parse(decodeURIComponent(redirectionData));

          if (redirection?.type === "location") {
            reactRouter.history.push(redirection.path);
          }
        }}
      />
    </PaperInCenter>
  );
});
