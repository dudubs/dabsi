import React from "react";
import { MuiDataManagerView } from "../../browser/mui/rpc/MuiDataManagerView";
import { InputMapView } from "../../typerpc/input/input-map/InputMapView";
import {
  AclUsersManager,
  AclUsersManagerRouter,
} from "../common/AclUsersManager";
import { MuiUserBasicInfoInputView } from "./MuiUserBasicInfoInputView";
import { MuiUserContactInfoInputView } from "./MuiUserContactInfoInputView";

// MuiAclManagerView

export const MuiAclUsersManagerView = (
  router: typeof AclUsersManagerRouter
) => {
  MuiDataManagerView({
    router,
    connection: AclUsersManager.service,
    renderAddInput: props => <MuiUserBasicInfoInputView {...props} />,
    renderEditInput: props => (
      <InputMapView.Fields
        {...props}
        fields={{
          basicInfo: props => <MuiUserBasicInfoInputView {...props} />,
          contactInfo: props => <MuiUserContactInfoInputView {...props} />,
        }}
      />
    ),
  });
};
