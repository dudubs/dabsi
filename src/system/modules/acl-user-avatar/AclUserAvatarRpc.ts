import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

export default RpcMap({
  updateAvatar: RpcFn<(uploadField: string) => void>(),
});

// AclEditUser.at("ns").register("")
