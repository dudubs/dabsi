import AclEditGroup from "@dabsi/system/acl/plugins/admin/groups/common/AclEditGroup";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export default AclEditGroup.registerDefault(
  "actions",
  RpcMap({
    updateUsers: RpcFn<(_: { changes: Record<string, boolean> }) => void>(),
  })
);
