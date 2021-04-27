import { AclLoginInfoEvent } from "@dabsi/system/acl/old-common/loginInfoEvent";
import { AclConnection } from "@dabsi/system/acl/old-common/rpc";
import "@dabsi/system/acl/old-browser/MuiLoginRouterView";
import { RootReactor } from "@dabsi/view/react/reactor/Reactor";

AclConnection.getLoginInfo().then(loginInfo => {
  RootReactor.emit(AclLoginInfoEvent, loginInfo);
});

import "@dabsi/system/acl/old-browser/MuiLoginRouterView";
