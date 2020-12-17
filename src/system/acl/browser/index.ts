import AclLoginInfoEvent from "@dabsi/system/acl/common/AclLoginInfoEvent";
import { AclConnection } from "@dabsi/system/acl/AclRpc";
import "@dabsi/system/acl/browser/MuiLoginRouterView";
import { RootReactor } from "@dabsi/react/reactor/Reactor";

AclConnection.getLoginInfo().then(loginInfo => {
  RootReactor.emit(AclLoginInfoEvent, loginInfo);
});

import "./MuiLoginRouterView";
