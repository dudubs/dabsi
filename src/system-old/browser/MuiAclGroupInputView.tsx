import React from "react";
import { MuiTextInputView } from "../../browser/mui/rpc/inputs/MuiTextInputView";
import { Lang } from "../../lang/Lang";
import { InputMapView } from "../../typerpc/input/input-map/InputMapView";
import { InputErrorHookViewProps } from "../../typerpc/input/InputErrorHook";
import { InputViewFn } from "../../typerpc/input/InputView";
import { AclGroupInput } from "../common/AclGroupsManager";

export const MuiAclGroupInputView: InputViewFn<typeof AclGroupInput> = props => {
  return (
    <InputMapView.Fields
      {...props}
      fields={{
        groupName: props => (
          <MuiTextInputView
            {...InputErrorHookViewProps(props)}
            title={Lang`GROUP_NAME`}
          />
        ),
      }}
    />
  );
};
