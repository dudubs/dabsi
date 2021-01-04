import AclLoginInfoEvent from "@dabsi/system/modules/acl/common/AclLoginInfoEvent";
import { AclConnection } from "@dabsi/system/modules/acl/common/AclRpc";
import "@dabsi/system/modules/acl/browser/MuiLoginRouterView";
import { RootReactor } from "@dabsi/react/reactor/Reactor";

AclConnection.getLoginInfo().then(loginInfo => {
  RootReactor.emit(AclLoginInfoEvent, loginInfo);
});

import "@dabsi/system/modules/acl/browser/MuiLoginRouterView";
