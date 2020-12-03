import React from "react";
import { MuiDataManagerView } from "../../../browser/mui/rpc/MuiDataManagerView";

import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { MuiUserBasicInfoInputView } from "../../../system-old/browser/MuiUserBasicInfoInputView";
import { MuiUserContactInfoInputView } from "../../../system-old/browser/MuiUserContactInfoInputView";
import { InputMapView } from "../../../typerpc/input/input-map/InputMapView";
import { AclAdminConnection, AclAdminRouter } from "../common";

MuiDataManagerView(AclAdminConnection.users)({
  router: AclAdminRouter.at("users"),
  editTabs: {
    groups: props => EmptyFragment,
  },
  renderAddInput: props => <MuiUserBasicInfoInputView {...props} />,
  renderEditInput: props => {
    return (
      <InputMapView.Fields
        {...props}
        fields={{
          basicInfo: props => <MuiUserBasicInfoInputView {...props} />,
          contactInfo: props => <MuiUserContactInfoInputView {...props} />,
        }}
      />
    );
  },
});
