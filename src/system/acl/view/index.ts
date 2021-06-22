import { AclCurrentUser } from "@dabsi/system/acl/common/AclCurrentUser";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { Reactor } from "@dabsi/view/Reactor";

export const AclCurrentUserReactor = new Reactor<AclCurrentUser | null>();

// TODO?: globalMessages
setTimeout(() => {
  AclRpc.instance.getCurrentUser().then(currentUser => {
    AclCurrentUserReactor.emit(currentUser);
  });
});
