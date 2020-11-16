import Grid from "@material-ui/core/Grid";
import React from "react";
import { MuiTextInputView } from "../../../browser/mui/rpc/inputs/MuiTextInputView";
import { Lang } from "../../../lang/Lang";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { InputErrorHookViewProps } from "../../../typerpc/input/InputErrorHook";
import { InputViewFn } from "../../../typerpc/input/InputView";
import { UserBasicInfoInput } from "../AclUsersManager";

export const MuiUserBasicInfoInputView: InputViewFn<typeof UserBasicInfoInput> = props => {
  return (
    <Grid container spacing={1}>
      <InputMapView.Fields
        {...props}
        fields={{
          firstName: props => (
            <Grid item xs={6}>
              <MuiTextInputView {...props} title={Lang`FIRST_NAME`} />
            </Grid>
          ),
          lastName: props => (
            <Grid item xs={6}>
              <MuiTextInputView {...props} title={Lang`LAST_NAME`} />
            </Grid>
          ),
          loginName: props => (
            <Grid item xs>
              <MuiTextInputView
                {...InputErrorHookViewProps({
                  ...props,
                  errorMap: {
                    ALREADY_EXISTS: Lang`LOGIN_NAME_IS_ALREADY_EXISTS`,
                  },
                })}
                title={Lang`LOGIN_NAME`}
              />
            </Grid>
          ),
        }}
      />
    </Grid>
  );
};
