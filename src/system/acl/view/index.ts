import { AclRpc, AclCurrentUser } from "@dabsi/system/acl/common/rpc";
import { Reactor } from "@dabsi/view/Reactor";

export const ACL_CurrentUserReactor = new Reactor<AclCurrentUser | null>();

setTimeout(() => {
  AclRpc.instance.getCurrentUser().then(status => {
    ACL_CurrentUserReactor.emit(status);
  });
});
