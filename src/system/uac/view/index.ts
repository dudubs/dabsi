import { UacCurrentUser } from "@dabsi/system/uac/common/UacCurrentUser";
import { UacRpc } from "@dabsi/system/uac/common/rpc";
import { Reactor } from "@dabsi/view/Reactor";

export const UacCurrentUserReactor = new Reactor<UacCurrentUser | null>();

// TODO?: globalMessages
setTimeout(() => {
  UacRpc.instance.getCurrentUser().then(currentUser => {
    UacCurrentUserReactor.emit(currentUser);
  });
});
