import React from "react";
import { MuiDataManagerView } from "../../browser/mui/rpc/MuiDataManagerView";
import {
  AclGroupsManager,
  AclGroupsManagerRouter,
} from "../common/AclGroupsManager";
import { MuiAclGroupInputView } from "./MuiAclGroupInputView";

export function MuiAclGroupsManagerView(router: typeof AclGroupsManagerRouter) {
  MuiDataManagerView(AclGroupsManager.service)({
    router,
    renderAddInput: props => <MuiAclGroupInputView {...props} />,
  });
}
