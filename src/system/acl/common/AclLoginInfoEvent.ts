import { Emittable } from "@dabsi/react/reactor/Reactor";
import { AclLoginInfo } from "@dabsi/system/acl/AclRpc";

export default Emittable<AclLoginInfo | { type: "logout" }>({
  type: "logout",
});
