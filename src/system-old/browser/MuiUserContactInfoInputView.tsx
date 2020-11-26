import React from "react";
import { MuiTextInputView } from "../../browser/mui/rpc/inputs/MuiTextInputView";
import { Lang } from "../../lang/Lang";
import { InputMapView } from "../../typerpc/input/input-map/InputMapView";
import { InputViewFn } from "../../typerpc/input/InputView";
import { UserContactInfoInput } from "../common/AclUsersManager";

export const MuiUserContactInfoInputView: InputViewFn<typeof UserContactInfoInput> = props => {
  return (
    <InputMapView.Fields
      {...props}
      fields={{
        phoneNumber: props => (
          <MuiTextInputView {...props} title={Lang`PHONE_NUMBER`} />
        ),
        email: props => <MuiTextInputView {...props} title={Lang`EMAIL`} />,
      }}
    />
  );
};
