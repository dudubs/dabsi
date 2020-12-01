import React from "react";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { MuiFormView } from "../../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../../lang/Lang";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { WidgetViewFn } from "../../../typerpc/widget/WidgetView";
import { AclLoginForm } from "../common";

export const MuiAclLoginFormView: WidgetViewFn<typeof AclLoginForm> = props => {
  return (
    <MuiFormView
      {...props}
      onSubmit={result => {
        console.log({ result });
      }}
      input={props => (
        <InputMapView.Fields
          {...props}
          fields={{
            loginName: props => (
              <MuiTextInputView {...props} title={Lang`LOGIN_NAME`} />
            ),
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
  );
};
