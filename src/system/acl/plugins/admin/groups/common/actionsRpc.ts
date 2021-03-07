import { AclAdminEditGroup } from "./editRpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export const AclAdminGroupActions = AclAdminEditGroup.registerDefault(
  "actions",
  RpcMap({
    updateUsers: RpcFn<(_: { changes: Record<string, boolean> }) => void>(),
  })
);
