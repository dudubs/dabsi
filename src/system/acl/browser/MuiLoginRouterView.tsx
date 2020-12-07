import Typography from "@material-ui/core/Typography";
import React from "react";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../../lang/Lang";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useReactRouter, useRoute } from "../../../typerouter/ReactRouter";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { WidgetRouterView } from "../../../typerpc/widget/WidgetRouterView";
import { PaperInCenter } from "../../admin/browser/PaperInCenter";
import { MuiInputMapView } from "../../core/browser/MuiInputMapView";
import { AclConnection, AclLoginRouter, LoginInfoEvent } from "../common";

WidgetRouterView(AclLoginRouter, AclConnection.login, props => {
  const emit = useEmitter();

  const route = useRoute();
  const reactRouter = useReactRouter();

  return (
    <PaperInCenter>
      <Typography variant={"h6"}>{Lang`LOGIN`}</Typography>
      <MuiFormView
        {...props}
        onSubmit={result => {
          emit(LoginInfoEvent, result);

          const redirectionData = reactRouter.history.location.search.match(
            /[?&]redirection=(?<x>[^&$]+)/
          )?.groups?.x;

          const redirection =
            redirectionData && JSON.parse(decodeURIComponent(redirectionData));

          if (redirection?.type === "location") {
            reactRouter.history.push(redirection.path);
          }
        }}
        input={props => (
          <MuiInputMapView
            {...props}
            children={{
              password: props => (
                <MuiTextInputView
                  {...props}
                  title={Lang`PASSWORD`}
                  TextFieldProps={{
                    type: "password",
                  }}
                />
              ),
            }}
          />
        )}
      />
    </PaperInCenter>
  );
});
