import { AclRpc, AclCurrentUser } from "@dabsi/system/acl/common/rpc";
import { Reactor } from "@dabsi/view/Reactor";

export const AclCurrentUserReactor = new Reactor<AclCurrentUser | null>();

setTimeout(() => {
  AclRpc.instance.getCurrentUser().then(status => {
    AclCurrentUserReactor.emit(status);
  });
});

// AclCurrentUserReactor.emit(...) AclCurrentUserReactor.use()
