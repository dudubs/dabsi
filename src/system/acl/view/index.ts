import { AclRpc, AclStats } from "@dabsi/system/acl/common/rpc";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import { emit } from "@dabsi/view/react/reactor/useEmitter";

export const AclStatsEvent = Emittable<AclStats>();

setTimeout(() => {
  AclRpc.instance.getStats().then(stats => {
    emit(AclStatsEvent, stats);
  });
});
