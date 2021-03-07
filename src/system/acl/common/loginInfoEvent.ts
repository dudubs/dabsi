import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { AclLoginInfo } from "@dabsi/system/acl/common/rpc";

export const AclLoginInfoEvent = Emittable<AclLoginInfo | { type: "logout" }>({
  type: "logout",
});
